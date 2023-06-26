import { GroupMessage } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupMessage: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupMessage();
  msg.payload(payload);
};
