import { GroupRemoved } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupRemoved: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupRemoved();
  msg.payload(payload);
};
