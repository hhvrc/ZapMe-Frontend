import type { Guild, Role, User } from '.';

export interface GuildMember {
  id: string;
  user: User;
  guild: Guild;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
