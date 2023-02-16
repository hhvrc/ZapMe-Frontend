import type Guild from './Guild';
import type UserSettings from './UserSettings';

export default interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  discriminator: string;
  guilds: Guild[];
  friends: User[];
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}
