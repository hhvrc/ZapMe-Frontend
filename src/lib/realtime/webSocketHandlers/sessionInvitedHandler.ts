import { SessionEventInvited } from '../serialization/fbs/session';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleSessionInvited: WebSocketMessageHandler = (cli, msg) => {
  const payload = new SessionEventInvited();
  msg.payload(payload);
};
