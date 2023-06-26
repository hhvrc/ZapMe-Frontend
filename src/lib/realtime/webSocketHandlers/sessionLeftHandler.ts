import { SessionEventLeft } from '../serialization/fbs/session';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleSessionLeft: WebSocketMessageHandler = (cli, msg) => {
  const payload = new SessionEventLeft();
  msg.payload(payload);
};
