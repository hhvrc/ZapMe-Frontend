import type User from './User';
import type GuildMember from './GuildMember';
import type Channel from './Channel';

export default interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: User;
  members: GuildMember[];
  channels: Channel[];
  createdAt: Date;
  updatedAt: Date;
}
