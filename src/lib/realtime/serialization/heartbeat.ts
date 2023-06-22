import {
  ClientHeartbeat,
  ClientMessage,
  ClientMessageBody,
} from './fbs/client';
import { Builder as FbsBuilder } from 'flatbuffers';

export function createClientHeartbeatMessage(lastRttMs: number): Uint8Array {
  const builder = new FbsBuilder(1024);
  const heartbeat = ClientHeartbeat.createClientHeartbeat(builder, lastRttMs);
  const message = ClientMessage.createClientMessage(
    builder,
    ClientMessageBody.heartbeat,
    heartbeat
  );
  builder.finish(message);
  return builder.asUint8Array();
}
