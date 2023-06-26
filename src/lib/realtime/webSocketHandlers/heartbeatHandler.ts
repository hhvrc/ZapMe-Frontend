import { ServerHeartbeat } from '../serialization/fbs/server';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

export const handleHeartbeat: WebSocketMessageHandler = (cli, msg) => {
  const payload = new ServerHeartbeat();
  msg.payload(payload);

  cli.ConnectionRTT = performance.now() - cli._hearbeatSendTime;
  cli.HeartbeatIntervalMS = payload.heartbeatIntervalMs();
};
