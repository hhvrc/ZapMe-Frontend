import { FriendRequestAdded } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleFriendRequestAdded: WebSocketMessageHandler = (cli, msg) => {
  const payload = new FriendRequestAdded();
  msg.payload(payload);
  console.log('[WS] Friend request added');
};
