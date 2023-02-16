import type User from './User';
import type AuthenticationMethod from './AuthenticationMethod';

export default interface Account {
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
