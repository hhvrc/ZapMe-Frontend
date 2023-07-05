import { UserOnlineStatus, UserOnlineStatusChanged } from '../serialization/fbs/server';
import { UserStatus } from '$lib/api';
import { UsersStore } from '$lib/stores/UserRepository';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleUserOnlineStatusChanged: WebSocketMessageHandler = (cli, msg) => {
  const payload = new UserOnlineStatusChanged();
  msg.payload(payload);

  const userId = payload.userId();

  let onlineStatus: UserStatus;
  switch (payload.status()) {
    case UserOnlineStatus.offline:
      onlineStatus = UserStatus.offline;
      console.log(`User ${userId} changed status to offline`);
      break;
    case UserOnlineStatus.do_not_disturb:
      onlineStatus = UserStatus.doNotDisturb;
      console.log(`User ${userId} changed status to do not disturb`);
      break;
    case UserOnlineStatus.inactive:
      onlineStatus = UserStatus.inactive;
      console.log(`User ${userId} changed status to inactive`);
      break;
    case UserOnlineStatus.online:
      onlineStatus = UserStatus.online;
      console.log(`User ${userId} changed status to online`);
      break;
    default:
      onlineStatus = UserStatus.offline;
      console.log(`User ${userId} changed status to unknown`);
      break;
  }

  UsersStore.updateUserById(userId, (usr) => {
    usr.status = onlineStatus;
    return usr;
  });
};
