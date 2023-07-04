import { UserStatus } from '$lib/api';

export function MapUserStatusToString(userStatus: UserStatus) {
  switch (userStatus) {
    case UserStatus.doNotDisturb:
      return 'Do Not Disturb';
    case UserStatus.inactive:
      return 'Idle';
    case UserStatus.online:
      return 'Online';
    case UserStatus.offline:
    default:
      return 'Offline';
  }
}
