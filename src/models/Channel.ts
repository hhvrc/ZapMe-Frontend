import type Guild from './Guild';

export default interface Channel {
  id: string;
  name: string;
  type: string;
  guild: Guild;
  createdAt: Date;
  updatedAt: Date;
}
