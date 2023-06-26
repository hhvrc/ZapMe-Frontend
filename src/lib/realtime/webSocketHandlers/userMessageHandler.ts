import { UserMessage } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserMessage: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserMessage();
  msg.payload(payload);
};
