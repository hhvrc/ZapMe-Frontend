import { FriendRequestRemoved } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleFriendRequestRemoved: WebSocketMessageHandler = (cli, msg) => {
  const payload = new FriendRequestRemoved();
  msg.payload(payload);
  console.log('[WS] Friend request removed');
};
