import type { Channel, GuildMember, User } from '.';

export interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: User;
  members: GuildMember[];
  channels: Channel[];
  createdAt: Date;
  updatedAt: Date;
}
