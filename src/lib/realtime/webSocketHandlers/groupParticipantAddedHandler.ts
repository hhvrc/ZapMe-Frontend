import { GroupParticipantAdded } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleGroupParticipantAdded: WebSocketMessageHandler = (cli, msg) => {
  const payload = new GroupParticipantAdded();
  msg.payload(payload);
};
