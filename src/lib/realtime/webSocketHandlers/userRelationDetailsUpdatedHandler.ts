import { UserRelationDetailsUpdated } from '../serialization/fbs/server';
import { UsersStore } from '$lib/stores/UserRepository';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserRelationDetailsUpdated: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserRelationDetailsUpdated();
  msg.payload(payload);

  const userId = payload.userId();

  console.log(`User ${userId} changed relation details`);

  UsersStore.updateUserById(userId, (usr) => {
    usr.relation = UserRelationType.none;
    return usr;
  });
};
