import { RealtimeSession } from './serialization/fbs/realtime';
import {
  GlobalMessage,
  ServerHeartbeat,
  ServerHello,
  ServerMessage,
  ServerMessageBody,
} from './serialization/fbs/server';
import { createClientHeartbeatMessage } from './serialization/heartbeat';
import { PUBLIC_BACKEND_WEBSOCKET_URL } from '$env/static/public';
import { isArrayBuffer } from '$lib/typeGuards';
import { ByteBuffer } from 'flatbuffers';

export class WebSocketClient {
  private _socket: WebSocket;
  private _jwtToken: string;
  private _heartbeatIntervalMs: number;
  private _heartbeatInterval: ReturnType<typeof setInterval> | null;
  private _hearbeatSendTime: number;
  private _heartbeatLastRttMs: number;

  constructor(jwtToken: string) {
    this._socket = new WebSocket(PUBLIC_BACKEND_WEBSOCKET_URL);
    this._jwtToken = jwtToken;
    this._heartbeatIntervalMs = 1000;
    this._heartbeatInterval = null;
    this._hearbeatSendTime = performance.now();
    this._heartbeatLastRttMs = 1000;

    this._socket.binaryType = 'arraybuffer';
    this._socket.onopen = this.onOpen.bind(this);
    this._socket.onclose = this.onClose.bind(this);
    this._socket.onmessage = this.onMessage.bind(this);
  }

  public get HeartbeatIntervalMS(): number {
    return this._heartbeatIntervalMs;
  }
  private set HeartbeatIntervalMS(v: number) {
    if (this._heartbeatInterval === null || this._heartbeatIntervalMs !== v) {
      this._heartbeatIntervalMs = v;
      if (this._heartbeatInterval !== null) {
        clearInterval(this._heartbeatInterval);
      }
      this._heartbeatInterval = setInterval(
        this.sendHeartbeat.bind(this),
        Number(v)
      );
    }
  }

  public get ConnectionRTT(): number {
    return this._heartbeatLastRttMs;
  }

  private onOpen() {
    console.log('[WS] Connected');
    this._socket.send(this._jwtToken);
  }

  private onClose() {
    console.log('[WS] Disconnected');
    if (this._heartbeatInterval !== null) {
      clearInterval(this._heartbeatInterval);
    }
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
    console.log('[WS] Authenticated');

    this.HeartbeatIntervalMS = msg.heartbeatIntervalMs();
    // this.ratelimitMessagesPerSec = msg.ratelimitMessagesPerSec();
    // this.ratelimitMessagesPerMin = msg.ratelimitMessagesPerMin();
    // this.ratelimitBytesPerSec = msg.ratelimitBytesPerSec();
    // this.ratelimitBytesPerMin = msg.ratelimitBytesPerMin();
  }

  private handleHeartbeatMessage(msg: ServerHeartbeat) {
    this._heartbeatLastRttMs = performance.now() - this._hearbeatSendTime;
    console.log(`[WS] RTT: ${this._heartbeatLastRttMs}ms`);
    this.HeartbeatIntervalMs = msg.heartbeatIntervalMs();
  }

  private handleRealtimeSessionMessage(msg: RealtimeSession) {
    console.log('[WS] Received realtime session message', msg.bodyType());
  }

  private handleGlobalMessage(msg: GlobalMessage) {
    console.log('[WS] Received global message', msg.title(), msg.body());
  }

  private handleInvalidMessage() {
    console.error('[WS] Received invalid message');
  }

  private sendHeartbeat() {
    this._hearbeatSendTime = performance.now();
    this._socket.send(
      createClientHeartbeatMessage(BigInt(this.HeartbeatIntervalMS))
    );
  }
}
