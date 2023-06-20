import { PUBLIC_BACKEND_WEBSOCKET_URL } from '$env/static/public';
import { isArrayBuffer } from '$lib/typeGuards';
import { ByteBuffer } from 'flatbuffers';
import { createClientHeartbeatMessage } from './serialization/heartbeat';
import { ServerHello, ServerMessage, ServerMessageBody } from './serialization/server/fbs';

export class WebSocketClient {
  socket: WebSocket;
  jwtToken: string;

  constructor(jwtToken: string) {
    this.socket = new WebSocket(PUBLIC_BACKEND_WEBSOCKET_URL);
    this.socket.binaryType = 'arraybuffer';
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);

    this.jwtToken = jwtToken;
  }

  private onOpen() {
    console.log('[WS] Connected');
    this.socket.send(this.jwtToken);
    console.log('[WS] Sent JWT token, waiting for ready message');
  }

  private onClose() {
    console.log('[WS] Disconnected');
  }

  private onMessage(msg: MessageEvent<string|ArrayBuffer|Blob>) {
    // Only accept binary messages
    if (!isArrayBuffer(msg.data)) {
      console.error('[WS] ERROR: Received non-binary message');
      return;
    }

    const data = msg.data as ArrayBuffer;
    const serverMessage = ServerMessage.getRootAsServerMessage(new ByteBuffer(new Uint8Array(data)));

    switch (serverMessage.messageType()) {
      case ServerMessageBody.hello:
      {
        const helloMessage = new ServerHello();
        serverMessage.message(helloMessage);
        console.log('[WS] Received hello message', helloMessage.sessionId(), helloMessage.userId());
        break;
      }
      case ServerMessageBody.goodbye:
        console.log('[WS] Received goodbye message', serverMessage.message(new ServerMessage()).message());
        break;
      case ServerMessageBody.heartbeat:
        console.log('[WS] Received heartbeat message');
        this.socket.send(createClientHeartbeatMessage(BigInt(0)));
        break;
      case ServerMessageBody.message_global:
        console.log('[WS] Received global message', serverMessage.message(new ServerMessage()).message());
        break;
      case ServerMessageBody.ready:
        console.log('[WS] Received ready message', serverMessage.message(new ServerMessage()).message());
        break;
      case ServerMessageBody.NONE:
        console.error('[WS] Received NONE message type', serverMessage.messageType());
        break;
      default:
        console.error('[WS] Received unknown message type', serverMessage.messageType());
        break;
    }
  }
}