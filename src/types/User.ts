import type { Guild, UserSettings } from '.';

export interface User {
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
