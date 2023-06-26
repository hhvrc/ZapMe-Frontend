import { UserSessionRequest } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserSessionRequest: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserSessionRequest();
  msg.payload(payload);
};
