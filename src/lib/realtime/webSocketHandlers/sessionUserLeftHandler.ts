import { SessionEventUserLeft } from '../serialization/fbs/session';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleSessionUserLeft: WebSocketMessageHandler = (cli, msg) => {
  const payload = new SessionEventUserLeft();
  msg.payload(payload);
};
