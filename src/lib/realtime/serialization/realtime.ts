import { ClientMessage, ClientMessageBody } from './fbs/client';
import {
  RealtimeSession,
  RealtimeSessionBody,
  RealtimeSessionIceCandidateDiscovered,
  RealtimeSessionMessage,
} from './fbs/realtime';
import { Builder as FbsBuilder } from 'flatbuffers';

export function createRealtimeSessionIceCandidateDiscovered(
  candidate: RTCIceCandidate
): Uint8Array {
  const builder = new FbsBuilder(1024);
  const candidateOffset = builder.createString(JSON.stringify(candidate));
  const realtimeSessionMessage =
    RealtimeSessionIceCandidateDiscovered.createRealtimeSessionIceCandidateDiscovered(
      builder,
      candidateOffset
    );
  const realtimeSession = RealtimeSession.createRealtimeSession(
    builder,
    RealtimeSessionBody.ice_candidate_discovered,
    realtimeSessionMessage
  );
  const clientMsg = ClientMessage.createClientMessage(
    builder,
    ClientMessageBody.realtime_session,
    realtimeSession
  );
  builder.finish(clientMsg);
  return builder.asUint8Array();
}

export function createRealtimeSessionMessage(messageText: string): Uint8Array {
  const builder = new FbsBuilder(1024);
  RealtimeSessionMessage.startRecepientUserIdsVector(builder, 0);
  const vectorOffset = builder.endVector();
  const messageTextOffset = builder.createString(messageText);
  const realtimeSessionMessage =
    RealtimeSessionMessage.createRealtimeSessionMessage(
      builder,
      vectorOffset,
      messageTextOffset
    );
  const realtimeSession = RealtimeSession.createRealtimeSession(
    builder,
    RealtimeSessionBody.message,
    realtimeSessionMessage
  );
  const clientMsg = ClientMessage.createClientMessage(
    builder,
    ClientMessageBody.realtime_session,
    realtimeSession
  );
  builder.finish(clientMsg);
  return builder.asUint8Array();
}
