import { PUBLIC_BACKEND_WEBSOCKET_URL } from '$env/static/public';
import { ClientHeartbeat, ClientMessageBody, ClientMessage } from '$lib/fbs/zapme/realtime';
import { Builder as FbsBuilder } from 'flatbuffers';

export class WebSocketClient {
  socket: WebSocket;

  constructor(jwtToken: string) {
    this.socket = new WebSocket(PUBLIC_BACKEND_WEBSOCKET_URL + '?token=' + encodeURIComponent(jwtToken));
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }

  private onOpen() {
    console.log('[WS] Connected');
    const builder = new FbsBuilder(1024);
    const heartbeat = ClientHeartbeat.createClientHeartbeat(builder, 0);
    const message = ClientMessage.createClientMessage(builder, BigInt(0), ClientMessageBody.heartbeat, heartbeat);
    builder.finish(message);
    const buf = builder.asUint8Array();
    this.socket.send(buf);
    console.log('[WS] Sent: ', buf);
  }

  private onClose() {
    console.log('[WS] Disconnected');
  }

  private onMessage(data: WebSocket.Data) {
    console.log('[WS] Received: ', data);
  }
}