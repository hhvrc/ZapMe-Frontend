import { SessionIceCandidateDiscovered } from '../serialization/fbs/session';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleSessionIceCandidateDiscovered: WebSocketMessageHandler = (cli, msg) => {
  const payload = new SessionIceCandidateDiscovered();
  msg.payload(payload);
};
