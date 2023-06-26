import { GroupInvite } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupInvite: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupInvite();
  msg.payload(payload);
};
