import { SessionEventUserJoined } from '../serialization/fbs/session';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleSessionUserJoined: WebSocketMessageHandler = (cli, msg) => {
  const payload = new SessionEventUserJoined();
  msg.payload(payload);
};
