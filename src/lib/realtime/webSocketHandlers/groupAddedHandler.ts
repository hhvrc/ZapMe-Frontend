import { GroupAdded } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupAdded: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupAdded();
  msg.payload(payload);
};
