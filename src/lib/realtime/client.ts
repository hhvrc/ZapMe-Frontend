import { PUBLIC_BACKEND_WEBSOCKET_URL } from '$env/static/public';
import { createClientHeartbeatMessage } from './serialization/heartbeat';

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
    this.socket.send(createClientHeartbeatMessage(BigInt(0)));
    console.log('[WS] Sent heartbeat');
  }

  private onClose() {
    console.log('[WS] Disconnected');
  }

  private onMessage(data: WebSocket.Data) {
    console.log('[WS] Received: ', data);
  }
}