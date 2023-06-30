import { UserFriendStatus } from '$lib/api';
import { userApi } from '$lib/fetchSingleton';
import { UsersStore } from '$lib/stores/UserRepository';

export async function SendFriendRequest(userId: string) {
  await userApi.createOrAcceptFriendRequest(userId);
  UsersStore.updateUserById(userId, (usr) => {
    usr.friendStatus = UserFriendStatus.friendRequestOutgoing;
    return usr;
  });
}
export async function AcceptFriendRequest(userId: string) {
  await userApi.createOrAcceptFriendRequest(userId);
  UsersStore.updateUserById(userId, (usr) => {
    usr.friendStatus = UserFriendStatus.friends;
    return usr;
  });
}
export async function UnfriendUser(userId: string) {
  await userApi.unfriendUser(userId);
  UsersStore.updateUserById(userId, (usr) => {
    usr.friendStatus = UserFriendStatus.none;
    return usr;
  });
}
export async function DeleteFriendRequest(userId: string) {
  await userApi.deleteFriendRequest(userId);
  UsersStore.updateUserById(userId, (usr) => {
    usr.friendStatus = UserFriendStatus.none;
    return usr;
  });
}
export async function BlockUser(userId: string) {
  await userApi.blockUser(userId);
  UsersStore.updateUserById(userId, (usr) => {
    usr.friendStatus = UserFriendStatus.blocked;
    return usr;
  });
}
export async function UnblockUser(userId: string) {
  await userApi.unblockUser(userId);
  UsersStore.updateUserById(userId, (usr) => {
    usr.friendStatus = UserFriendStatus.none;
    return usr;
  });
}
