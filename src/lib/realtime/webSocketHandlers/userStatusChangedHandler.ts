import { UserStatusChanged } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserStatusChanged: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserStatusChanged();
  msg.payload(payload);
};
