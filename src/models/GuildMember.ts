import type Guild from './Guild';
import type Role from './Role';
import type User from './User';

export default interface GuildMember {
  id: string;
  user: User;
  guild: Guild;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
