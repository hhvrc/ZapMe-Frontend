import {
  ClientHeartbeat,
  ClientMessage,
  ClientMessageBody,
} from './fbs/client';
import { Builder as FbsBuilder } from 'flatbuffers';

export function createClientHeartbeatMessage(timestamp: bigint): Uint8Array {
  const builder = new FbsBuilder(1024);
  const heartbeat = ClientHeartbeat.createClientHeartbeat(builder, timestamp);
  const message = ClientMessage.createClientMessage(
    builder,
    timestamp,
    ClientMessageBody.heartbeat,
    heartbeat
  );
  builder.finish(message);
  return builder.asUint8Array();
}
