import type { Guild } from '.';

export interface Channel {
  id: string;
  name: string;
  type: string;
  guild: Guild;
  createdAt: Date;
  updatedAt: Date;
}
