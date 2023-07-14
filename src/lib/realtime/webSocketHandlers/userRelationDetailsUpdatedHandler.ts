import { UserRelationDetailsUpdated } from '../serialization/fbs/server';
import { UsersStore } from '$lib/stores/UserRepository';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserRelationDetailsUpdated: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserRelationDetailsUpdated();
  msg.payload(payload);

  const userId = payload.userId();
  if (!userId) return;

  console.log(`User ${userId} changed relation details`);

  UsersStore.updateUserById(userId, (usr) => {
    usr.isFavorite = payload.isFavorite();

    usr.isMuted = payload.isMuted();

    const nickname = payload.nickname();
    if (nickname) {
      usr.nickName = nickname;
    }

    const notes = payload.notes();
    if (notes) {
      usr.notes = notes;
    }

    return usr;
  });
};
