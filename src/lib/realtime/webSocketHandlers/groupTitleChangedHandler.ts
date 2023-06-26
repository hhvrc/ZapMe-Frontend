import { GroupTitleChanged } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupTitleChanged: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupTitleChanged();
  msg.payload(payload);
};
