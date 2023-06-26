import { SessionEventJoined } from '../serialization/fbs/session';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleSessionJoined: WebSocketMessageHandler = (cli, msg) => {
  const payload = new SessionEventJoined();
  msg.payload(payload);
};
