import { ServerReady } from '../serialization/fbs/server';
import { AuthenticationState } from '../WebSocketClient';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleReady: WebSocketMessageHandler = (cli, msg) => {
  const payload = new ServerReady();
  msg.payload(payload);

  cli.AuthenticationState = AuthenticationState.AUTHENTICATED;
  console.log('[WS] Authenticated');

  cli.HeartbeatIntervalMS = payload.heartbeatIntervalMs();
  //wsClient._ratelimitMessagesPerSec = msg.ratelimitMessagesPerSec();
  //wsClient._ratelimitMessagesPerMin = msg.ratelimitMessagesPerMin();
  //wsClient._ratelimitBytesPerSec = msg.ratelimitBytesPerSec();
  //wsClient._ratelimitBytesPerMin = msg.ratelimitBytesPerMin();
};
