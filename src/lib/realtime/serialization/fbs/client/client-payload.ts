// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import { ClientHeartbeat } from '../../fbs/client/client-heartbeat.js';
import { SessionIceCandidateDiscovered } from '../../fbs/session/session-ice-candidate-discovered.js';
import { SessionInvite } from '../../fbs/session/session-invite.js';
import { SessionJoin } from '../../fbs/session/session-join.js';
import { SessionLeave } from '../../fbs/session/session-leave.js';
import { SessionReject } from '../../fbs/session/session-reject.js';
import { SessionRejoin } from '../../fbs/session/session-rejoin.js';

export enum ClientPayload {
  NONE = 0,
  heartbeat = 1,
  session_join = 2,
  session_leave = 3,
  session_reject = 4,
  session_rejoin = 5,
  session_invite = 6,
  session_ice_candidate_discovered = 7,
}

export function unionToClientPayload(
  type: ClientPayload,
  accessor: (
    obj:
      | ClientHeartbeat
      | SessionIceCandidateDiscovered
      | SessionInvite
      | SessionJoin
      | SessionLeave
      | SessionReject
      | SessionRejoin
  ) =>
    | ClientHeartbeat
    | SessionIceCandidateDiscovered
    | SessionInvite
    | SessionJoin
    | SessionLeave
    | SessionReject
    | SessionRejoin
    | null
):
  | ClientHeartbeat
  | SessionIceCandidateDiscovered
  | SessionInvite
  | SessionJoin
  | SessionLeave
  | SessionReject
  | SessionRejoin
  | null {
  switch (ClientPayload[type]) {
    case 'NONE':
      return null;
    case 'heartbeat':
      return accessor(new ClientHeartbeat())! as ClientHeartbeat;
    case 'session_join':
      return accessor(new SessionJoin())! as SessionJoin;
    case 'session_leave':
      return accessor(new SessionLeave())! as SessionLeave;
    case 'session_reject':
      return accessor(new SessionReject())! as SessionReject;
    case 'session_rejoin':
      return accessor(new SessionRejoin())! as SessionRejoin;
    case 'session_invite':
      return accessor(new SessionInvite())! as SessionInvite;
    case 'session_ice_candidate_discovered':
      return accessor(new SessionIceCandidateDiscovered())! as SessionIceCandidateDiscovered;
    default:
      return null;
  }
}

export function unionListToClientPayload(
  type: ClientPayload,
  accessor: (
    index: number,
    obj:
      | ClientHeartbeat
      | SessionIceCandidateDiscovered
      | SessionInvite
      | SessionJoin
      | SessionLeave
      | SessionReject
      | SessionRejoin
  ) =>
    | ClientHeartbeat
    | SessionIceCandidateDiscovered
    | SessionInvite
    | SessionJoin
    | SessionLeave
    | SessionReject
    | SessionRejoin
    | null,
  index: number
):
  | ClientHeartbeat
  | SessionIceCandidateDiscovered
  | SessionInvite
  | SessionJoin
  | SessionLeave
  | SessionReject
  | SessionRejoin
  | null {
  switch (ClientPayload[type]) {
    case 'NONE':
      return null;
    case 'heartbeat':
      return accessor(index, new ClientHeartbeat())! as ClientHeartbeat;
    case 'session_join':
      return accessor(index, new SessionJoin())! as SessionJoin;
    case 'session_leave':
      return accessor(index, new SessionLeave())! as SessionLeave;
    case 'session_reject':
      return accessor(index, new SessionReject())! as SessionReject;
    case 'session_rejoin':
      return accessor(index, new SessionRejoin())! as SessionRejoin;
    case 'session_invite':
      return accessor(index, new SessionInvite())! as SessionInvite;
    case 'session_ice_candidate_discovered':
      return accessor(index, new SessionIceCandidateDiscovered())! as SessionIceCandidateDiscovered;
    default:
      return null;
  }
}
