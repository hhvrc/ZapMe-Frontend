import { GroupSessionRequest } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupSessionRequest: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupSessionRequest();
  msg.payload(payload);
};
