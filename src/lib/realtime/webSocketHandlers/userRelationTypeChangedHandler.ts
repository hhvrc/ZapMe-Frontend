import {
  UserRelationType as FbsRelationType,
  UserRelationTypeChanged,
} from '../serialization/fbs/server';
import { UserRelationType as ApiRelationType } from '$lib/api';
import { UsersStore } from '$lib/stores/UserRepository';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserRelationTypeChanged: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserRelationTypeChanged();
  msg.payload(payload);

  const userId = payload.userId();

  let relationType: ApiRelationType;
  switch (payload.relationType()) {
    case FbsRelationType.none:
      relationType = ApiRelationType.None;
      console.log(`User ${userId} changed relation type to none`);
      break;
    case FbsRelationType.friend_request_sent:
      relationType = ApiRelationType.FriendRequestSent;
      console.log(`User ${userId} changed relation type to friend request sent`);
      break;
    case FbsRelationType.friend_request_received:
      relationType = ApiRelationType.FriendRequestReceived;
      console.log(`User ${userId} changed relation type to friend request received`);
      break;
    case FbsRelationType.blocked:
      relationType = ApiRelationType.Blocked;
      console.log(`User ${userId} changed relation type to blocked`);
      break;
    case FbsRelationType.friend:
      relationType = ApiRelationType.Friend;
      console.log(`User ${userId} changed relation type to friend`);
      break;
    default:
      relationType = ApiRelationType.None;
      console.log(`User ${userId} changed relation type to unknown`);
      break;
  }

  UsersStore.updateUserById(userId, (usr) => {
    usr.relation = relationType;
    return usr;
  });
};
