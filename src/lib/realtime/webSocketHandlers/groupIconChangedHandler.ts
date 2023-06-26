import { GroupIconChanged } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupIconChanged: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupIconChanged();
  msg.payload(payload);
};
