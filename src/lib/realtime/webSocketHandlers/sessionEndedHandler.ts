import { SessionEventEnded } from '../serialization/fbs/session';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleSessionEnded: WebSocketMessageHandler = (cli, msg) => {
  const payload = new SessionEventEnded();
  msg.payload(payload);
};
