import { UserStatusMessageChanged } from '../serialization/fbs/server';
import { UsersStore } from '$lib/stores/UserRepository';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserStatusMessageChanged: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserStatusMessageChanged();
  msg.payload(payload);

  const userId = payload.userId();
  if (!userId) return;

  console.log(`User ${userId} changed status message`);

  UsersStore.updateUserById(userId, (usr) => {
    usr.statusText = payload.statusMessage() ?? '';
    return usr;
  });
};
