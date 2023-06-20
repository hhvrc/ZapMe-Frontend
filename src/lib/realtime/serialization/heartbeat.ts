import { Builder as FbsBuilder } from 'flatbuffers';
import { ClientHeartbeat, ClientMessageBody, ClientMessage } from './client/fbs';

export function createClientHeartbeatMessage(timestamp: bigint): Uint8Array {
  const builder = new FbsBuilder(1024);
  const heartbeat = ClientHeartbeat.createClientHeartbeat(builder, timestamp);
  const message = ClientMessage.createClientMessage(builder, timestamp, ClientMessageBody.heartbeat, heartbeat);
  builder.finish(message);
  return builder.asUint8Array();
}