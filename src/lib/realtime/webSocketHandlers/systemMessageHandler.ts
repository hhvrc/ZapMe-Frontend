import { SystemMessage, SystemMessageLevel, SystemMessageType } from '../serialization/fbs/server';
import { toastStore } from '@skeletonlabs/skeleton';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleSystemMessage: WebSocketMessageHandler = (cli, msg) => {
  const systemMessage = new SystemMessage();
  msg.payload(systemMessage);

  const type = systemMessage.type();
  const level = systemMessage.level();
  const title = systemMessage.title();

  if (!title) {
    return;
  }

  if (type === SystemMessageType.TOAST) {
    toastStore.trigger({ message: title });
  } else if (type === SystemMessageType.POPUP) {
    // TODO: Implement popup
  }
};
