import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleInvalidMessage: WebSocketMessageHandler = () => {
  console.error('[WS] Received invalid message');
};
