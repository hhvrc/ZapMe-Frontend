import {
  RealtimeSession,
  RealtimeSessionBody,
  RealtimeSessionMessage,
} from './serialization/fbs/realtime';
import {
  GlobalMessage,
  ServerHeartbeat,
  ServerHello,
  ServerMessage,
  ServerMessageBody,
} from './serialization/fbs/server';
import { createClientHeartbeatMessage } from './serialization/heartbeat';
import {
  createRealtimeSessionIceCandidateDiscovered,
  createRealtimeSessionMessage,
} from './serialization/realtime';
import { PUBLIC_BACKEND_WEBSOCKET_URL } from '$env/static/public';
import { SessionTokenStore } from '$lib/stores';
import { isArrayBuffer } from '$lib/typeGuards';
import { ByteBuffer } from 'flatbuffers';

export class WebSocketClient {
  private _socket: WebSocket | null = null;
  private _hearbeatSendTime = 0;

  public static readonly DISCONNECTED = 0;
  public static readonly DISCONNECTING = 1;
  public static readonly CONNECTING = 2;
  public static readonly CONNECTED = 3;
  private _connectionState = WebSocketClient.DISCONNECTED;
  private _connectionStateChangeHandlers: ((state: number) => void)[] = [];
  public get ConnectionState(): number {
    return this._connectionState;
  }
  public set ConnectionState(v: number) {
    if (this._connectionState !== v) {
      this._connectionState = v;
      if (v !== WebSocketClient.CONNECTED) {
        this.AuthenticationState = this.UNAUTHENTICATED;
      }
      this._connectionStateChangeHandlers.forEach((cb) => cb(v));
    }
  }
  public addConnectionStateChangeHandler(cb: (state: number) => void) {
    this._connectionStateChangeHandlers.push(cb);
  }
  public removeConnectionStateChangeHandler(cb: (state: number) => void) {
    const idx = this._connectionStateChangeHandlers.indexOf(cb);
    if (idx !== -1) {
      this._connectionStateChangeHandlers.splice(idx, 1);
    }
  }

  public readonly UNAUTHENTICATED = 0;
  public readonly AUTHENTICATING = 1;
  public readonly AUTHENTICATED = 2;
  private _authenticationState = this.UNAUTHENTICATED;
  private _uthenticationStateChangeHandlers: ((state: number) => void)[] = [];
  public get AuthenticationState(): number {
    return this._authenticationState;
  }
  public set AuthenticationState(v: number) {
    if (this._authenticationState !== v) {
      this._authenticationState = v;
      this._uthenticationStateChangeHandlers.forEach((cb) => cb(v));
    }
  }
  public addAuthenticationStateChangeHandler(cb: (state: number) => void) {
    this._uthenticationStateChangeHandlers.push(cb);
  }
  public removeAuthenticationStateChangeHandler(cb: (state: number) => void) {
    const idx = this._uthenticationStateChangeHandlers.indexOf(cb);
    if (idx !== -1) {
      this._uthenticationStateChangeHandlers.splice(idx, 1);
    }
  }

  private _heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private _heartbeatIntervalMs = 1000;
  public get HeartbeatIntervalMS(): number {
    return this._heartbeatIntervalMs;
  }
  private set HeartbeatIntervalMS(v: number) {
    if (this._heartbeatIntervalMs !== v) {
      this._heartbeatIntervalMs = v;
      if (this._heartbeatInterval !== null) {
        clearInterval(this._heartbeatInterval);
      }
      this._heartbeatInterval = setInterval(this.sendHeartbeat.bind(this), v);
    }
  }

  private _connectionRTT = 1000;
  private _connectionRTTChangeHandlers: ((rtt: number) => void)[] = [];
  public get ConnectionRTT(): number {
    return this._connectionRTT;
  }
  private set ConnectionRTT(v: number) {
    if (this._connectionRTT !== v) {
      this._connectionRTT = v;
      console.log(`[WS] RTT: ${v}ms`);
      this._connectionRTTChangeHandlers.forEach((cb) => cb(v));
    }
  }
  public addConnectionRTTChangeHandler(cb: (rtt: number) => void) {
    this._connectionRTTChangeHandlers.push(cb);
  }
  public removeConnectionRTTChangeHandler(cb: (rtt: number) => void) {
    const idx = this._connectionRTTChangeHandlers.indexOf(cb);
    if (idx !== -1) {
      this._connectionRTTChangeHandlers.splice(idx, 1);
    }
  }

  public Connect() {
    const connectionState = this.ConnectionState;
    if (
      connectionState === WebSocketClient.CONNECTING ||
      connectionState === WebSocketClient.CONNECTED
    ) {
      console.error('[WS] ERROR: Connection already in progress');
      return;
    }

    if (this._socket !== null) {
      this.DisconnectInternal();
    }

    this._connectionState = WebSocketClient.CONNECTING;

    this._socket = new WebSocket(PUBLIC_BACKEND_WEBSOCKET_URL);
    this._socket.binaryType = 'arraybuffer';
    this._socket.onopen = this.onOpen.bind(this);
    this._socket.onclose = this.onClose.bind(this);
    this._socket.onerror = this.onError.bind(this);
    this._socket.onmessage = this.onMessage.bind(this);
  }

  private DisconnectInternal() {
    if (this._heartbeatInterval !== null) {
      clearInterval(this._heartbeatInterval);
      this._heartbeatInterval = null;
    }

    if (this._socket !== null) {
      try {
        this._socket.close();
      } catch (e) {
        console.error(e);
      }
      this._socket.onopen = null;
      this._socket.onclose = null;
      this._socket.onerror = null;
      this._socket.onmessage = null;
      this._socket = null;
    }
  }
  public Disconnect() {
    const connectionState = this.ConnectionState;
    if (connectionState !== WebSocketClient.DISCONNECTED) {
      this.ConnectionState = WebSocketClient.DISCONNECTING;
    }

    this.DisconnectInternal();

    this.ConnectionState = WebSocketClient.DISCONNECTED;
  }

  private onOpen(ev: Event) {
    if (!this._socket) {
      console.error('[WS] ERROR: Socket not initialized');
      this.Disconnect();
      return;
    }

    this.ConnectionState = WebSocketClient.CONNECTED;
    console.log('[WS] Connected');

    const sessionToken = SessionTokenStore.get();
    if (!sessionToken) {
      console.error('[WS] ERROR: User not authenticated');
      this.Disconnect();
      return;
    }

    this.AuthenticationState = this.AUTHENTICATING;
    this._socket.send(sessionToken.jwtToken);
  }

  private onClose(ev: CloseEvent) {
    this.DisconnectInternal();
    this.ConnectionState = WebSocketClient.DISCONNECTED;
    console.log('[WS] Disconnected');
  }

  private onError(ev: Event) {
    console.error('[WS] ERROR: ', ev);
    this.DisconnectInternal();
    this.ConnectionState = WebSocketClient.DISCONNECTED;
  }

  private onMessage(msg: MessageEvent<string | ArrayBuffer | Blob>) {
    // Only accept binary messages
    if (!isArrayBuffer(msg.data)) {
      console.error('[WS] ERROR: Received non-binary message');
      return;
    }

    const data = msg.data as ArrayBuffer;
    const serverMessage = ServerMessage.getRootAsServerMessage(
      new ByteBuffer(new Uint8Array(data))
    );

    switch (serverMessage.messageType()) {
      case ServerMessageBody.hello: {
        const helloMessage = new ServerHello();
        serverMessage.message(helloMessage);
        this.handleHelloMessage(helloMessage);
        return;
      }
      case ServerMessageBody.heartbeat: {
        const heartbeatMessage = new ServerHeartbeat();
        serverMessage.message(heartbeatMessage);
        this.handleHeartbeatMessage(heartbeatMessage);
        return;
      }
      case ServerMessageBody.realtime_session: {
        const realtimeSessionMessage = new RealtimeSession();
        serverMessage.message(realtimeSessionMessage);
        this.handleRealtimeSessionMessage(realtimeSessionMessage);
        return;
      }
      case ServerMessageBody.message_global: {
        const globalMessage = new GlobalMessage();
        serverMessage.message(globalMessage);
        this.handleGlobalMessage(globalMessage);
        return;
      }
      case ServerMessageBody.NONE:
        return this.handleInvalidMessage();
      default:
        return this.handleInvalidMessage();
    }
  }

  private handleHelloMessage(msg: ServerHello) {
    this.AuthenticationState = this.AUTHENTICATED;
    console.log('[WS] Authenticated');

    this.HeartbeatIntervalMS = msg.heartbeatIntervalMs();
    // this.ratelimitMessagesPerSec = msg.ratelimitMessagesPerSec();
    // this.ratelimitMessagesPerMin = msg.ratelimitMessagesPerMin();
    // this.ratelimitBytesPerSec = msg.ratelimitBytesPerSec();
    // this.ratelimitBytesPerMin = msg.ratelimitBytesPerMin();
  }

  private handleHeartbeatMessage(msg: ServerHeartbeat) {
    this.ConnectionRTT = performance.now() - this._hearbeatSendTime;
    this.HeartbeatIntervalMS = msg.heartbeatIntervalMs();
  }

  private handleRealtimeSessionMessage(msg: RealtimeSession) {
    console.log('[WS] Received realtime session message');
  }

  private handleGlobalMessage(msg: GlobalMessage) {
    console.log('[WS] Received global message', msg.title(), msg.body());
  }

  private handleInvalidMessage() {
    console.error('[WS] Received invalid message');
  }

  private sendHeartbeat() {
    if (!this._socket) {
      this.Disconnect();
      return;
    }

    this._hearbeatSendTime = performance.now();
    this._socket.send(createClientHeartbeatMessage(this.HeartbeatIntervalMS));
  }
}
