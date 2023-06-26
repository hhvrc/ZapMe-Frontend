import { UserRelationChanged } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserRelationChanged: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserRelationChanged();
  msg.payload(payload);
};
