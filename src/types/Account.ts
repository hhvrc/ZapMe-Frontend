import type { AuthenticationMethod, User } from '.';

export interface Account {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  profilePictureId: string;
  // profilePicture: Image;
  status: string;
  statusText: string;
  acceptedTosVersion: number;
  friends: User[];
  authenticationMethods: AuthenticationMethod[];
  createdAt: Date;
  lastOnlineAt: Date;
}
