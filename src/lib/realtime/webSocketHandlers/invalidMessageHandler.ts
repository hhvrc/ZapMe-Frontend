import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleInvalidMessage: WebSocketMessageHandler = (cli, msg) => {
  console.error('[WS] Received invalid message');
};
