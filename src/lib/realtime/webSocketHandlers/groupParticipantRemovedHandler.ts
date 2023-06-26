import { GroupParticipantRemoved } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupParticipantRemoved: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupParticipantRemoved();
  msg.payload(payload);
};
