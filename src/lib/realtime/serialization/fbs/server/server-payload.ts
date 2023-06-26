// automatically generated by the FlatBuffers compiler, do not modify

import { FriendRequestAdded } from '../../fbs/server/friend-request-added.js';
import { FriendRequestRemoved } from '../../fbs/server/friend-request-removed.js';
import { GroupAdded } from '../../fbs/server/group-added.js';
import { GroupIconChanged } from '../../fbs/server/group-icon-changed.js';
import { GroupInvite } from '../../fbs/server/group-invite.js';
import { GroupMessage } from '../../fbs/server/group-message.js';
import { GroupParticipantAdded } from '../../fbs/server/group-participant-added.js';
import { GroupParticipantRemoved } from '../../fbs/server/group-participant-removed.js';
import { GroupRemoved } from '../../fbs/server/group-removed.js';
import { GroupSessionRequest } from '../../fbs/server/group-session-request.js';
import { GroupTitleChanged } from '../../fbs/server/group-title-changed.js';
import { ServerHeartbeat } from '../../fbs/server/server-heartbeat.js';
import { ServerReady } from '../../fbs/server/server-ready.js';
import { SystemMessage } from '../../fbs/server/system-message.js';
import { UserMessage } from '../../fbs/server/user-message.js';
import { UserRelationChanged } from '../../fbs/server/user-relation-changed.js';
import { UserSessionRequest } from '../../fbs/server/user-session-request.js';
import { UserStatusChanged } from '../../fbs/server/user-status-changed.js';
import { SessionEventEnded } from '../../fbs/session/session-event-ended.js';
import { SessionEventIceCandidateDiscovered } from '../../fbs/session/session-event-ice-candidate-discovered.js';
import { SessionEventInvited } from '../../fbs/session/session-event-invited.js';
import { SessionEventJoined } from '../../fbs/session/session-event-joined.js';
import { SessionEventLeft } from '../../fbs/session/session-event-left.js';
import { SessionEventUserJoined } from '../../fbs/session/session-event-user-joined.js';
import { SessionEventUserLeft } from '../../fbs/session/session-event-user-left.js';

export enum ServerPayload {
  NONE = 0,
  ready = 1,
  heartbeat = 2,
  system_message = 3,
  user_status_changed = 4,
  user_relation_changed = 5,
  user_message = 6,
  user_session_request = 7,
  friend_request_added = 8,
  friend_request_removed = 9,
  group_invite = 10,
  group_added = 11,
  group_removed = 12,
  group_title_changed = 13,
  group_icon_changed = 14,
  group_participant_added = 15,
  group_participant_removed = 16,
  group_message = 17,
  group_session_request = 18,
  session_joined = 19,
  session_user_joined = 20,
  session_user_left = 21,
  session_invited = 22,
  session_left = 23,
  session_ended = 24,
  session_ice_candidate_discovered = 25,
}

export function unionToServerPayload(
  type: ServerPayload,
  accessor: (
    obj:
      | FriendRequestAdded
      | FriendRequestRemoved
      | GroupAdded
      | GroupIconChanged
      | GroupInvite
      | GroupMessage
      | GroupParticipantAdded
      | GroupParticipantRemoved
      | GroupRemoved
      | GroupSessionRequest
      | GroupTitleChanged
      | ServerHeartbeat
      | ServerReady
      | SessionEventEnded
      | SessionEventIceCandidateDiscovered
      | SessionEventInvited
      | SessionEventJoined
      | SessionEventLeft
      | SessionEventUserJoined
      | SessionEventUserLeft
      | SystemMessage
      | UserMessage
      | UserRelationChanged
      | UserSessionRequest
      | UserStatusChanged
  ) =>
    | FriendRequestAdded
    | FriendRequestRemoved
    | GroupAdded
    | GroupIconChanged
    | GroupInvite
    | GroupMessage
    | GroupParticipantAdded
    | GroupParticipantRemoved
    | GroupRemoved
    | GroupSessionRequest
    | GroupTitleChanged
    | ServerHeartbeat
    | ServerReady
    | SessionEventEnded
    | SessionEventIceCandidateDiscovered
    | SessionEventInvited
    | SessionEventJoined
    | SessionEventLeft
    | SessionEventUserJoined
    | SessionEventUserLeft
    | SystemMessage
    | UserMessage
    | UserRelationChanged
    | UserSessionRequest
    | UserStatusChanged
    | null
):
  | FriendRequestAdded
  | FriendRequestRemoved
  | GroupAdded
  | GroupIconChanged
  | GroupInvite
  | GroupMessage
  | GroupParticipantAdded
  | GroupParticipantRemoved
  | GroupRemoved
  | GroupSessionRequest
  | GroupTitleChanged
  | ServerHeartbeat
  | ServerReady
  | SessionEventEnded
  | SessionEventIceCandidateDiscovered
  | SessionEventInvited
  | SessionEventJoined
  | SessionEventLeft
  | SessionEventUserJoined
  | SessionEventUserLeft
  | SystemMessage
  | UserMessage
  | UserRelationChanged
  | UserSessionRequest
  | UserStatusChanged
  | null {
  switch (ServerPayload[type]) {
    case 'NONE':
      return null;
    case 'ready':
      return accessor(new ServerReady())! as ServerReady;
    case 'heartbeat':
      return accessor(new ServerHeartbeat())! as ServerHeartbeat;
    case 'system_message':
      return accessor(new SystemMessage())! as SystemMessage;
    case 'user_status_changed':
      return accessor(new UserStatusChanged())! as UserStatusChanged;
    case 'user_relation_changed':
      return accessor(new UserRelationChanged())! as UserRelationChanged;
    case 'user_message':
      return accessor(new UserMessage())! as UserMessage;
    case 'user_session_request':
      return accessor(new UserSessionRequest())! as UserSessionRequest;
    case 'friend_request_added':
      return accessor(new FriendRequestAdded())! as FriendRequestAdded;
    case 'friend_request_removed':
      return accessor(new FriendRequestRemoved())! as FriendRequestRemoved;
    case 'group_invite':
      return accessor(new GroupInvite())! as GroupInvite;
    case 'group_added':
      return accessor(new GroupAdded())! as GroupAdded;
    case 'group_removed':
      return accessor(new GroupRemoved())! as GroupRemoved;
    case 'group_title_changed':
      return accessor(new GroupTitleChanged())! as GroupTitleChanged;
    case 'group_icon_changed':
      return accessor(new GroupIconChanged())! as GroupIconChanged;
    case 'group_participant_added':
      return accessor(new GroupParticipantAdded())! as GroupParticipantAdded;
    case 'group_participant_removed':
      return accessor(new GroupParticipantRemoved())! as GroupParticipantRemoved;
    case 'group_message':
      return accessor(new GroupMessage())! as GroupMessage;
    case 'group_session_request':
      return accessor(new GroupSessionRequest())! as GroupSessionRequest;
    case 'session_joined':
      return accessor(new SessionEventJoined())! as SessionEventJoined;
    case 'session_user_joined':
      return accessor(new SessionEventUserJoined())! as SessionEventUserJoined;
    case 'session_user_left':
      return accessor(new SessionEventUserLeft())! as SessionEventUserLeft;
    case 'session_invited':
      return accessor(new SessionEventInvited())! as SessionEventInvited;
    case 'session_left':
      return accessor(new SessionEventLeft())! as SessionEventLeft;
    case 'session_ended':
      return accessor(new SessionEventEnded())! as SessionEventEnded;
    case 'session_ice_candidate_discovered':
      return accessor(
        new SessionEventIceCandidateDiscovered()
      )! as SessionEventIceCandidateDiscovered;
    default:
      return null;
  }
}

export function unionListToServerPayload(
  type: ServerPayload,
  accessor: (
    index: number,
    obj:
      | FriendRequestAdded
      | FriendRequestRemoved
      | GroupAdded
      | GroupIconChanged
      | GroupInvite
      | GroupMessage
      | GroupParticipantAdded
      | GroupParticipantRemoved
      | GroupRemoved
      | GroupSessionRequest
      | GroupTitleChanged
      | ServerHeartbeat
      | ServerReady
      | SessionEventEnded
      | SessionEventIceCandidateDiscovered
      | SessionEventInvited
      | SessionEventJoined
      | SessionEventLeft
      | SessionEventUserJoined
      | SessionEventUserLeft
      | SystemMessage
      | UserMessage
      | UserRelationChanged
      | UserSessionRequest
      | UserStatusChanged
  ) =>
    | FriendRequestAdded
    | FriendRequestRemoved
    | GroupAdded
    | GroupIconChanged
    | GroupInvite
    | GroupMessage
    | GroupParticipantAdded
    | GroupParticipantRemoved
    | GroupRemoved
    | GroupSessionRequest
    | GroupTitleChanged
    | ServerHeartbeat
    | ServerReady
    | SessionEventEnded
    | SessionEventIceCandidateDiscovered
    | SessionEventInvited
    | SessionEventJoined
    | SessionEventLeft
    | SessionEventUserJoined
    | SessionEventUserLeft
    | SystemMessage
    | UserMessage
    | UserRelationChanged
    | UserSessionRequest
    | UserStatusChanged
    | null,
  index: number
):
  | FriendRequestAdded
  | FriendRequestRemoved
  | GroupAdded
  | GroupIconChanged
  | GroupInvite
  | GroupMessage
  | GroupParticipantAdded
  | GroupParticipantRemoved
  | GroupRemoved
  | GroupSessionRequest
  | GroupTitleChanged
  | ServerHeartbeat
  | ServerReady
  | SessionEventEnded
  | SessionEventIceCandidateDiscovered
  | SessionEventInvited
  | SessionEventJoined
  | SessionEventLeft
  | SessionEventUserJoined
  | SessionEventUserLeft
  | SystemMessage
  | UserMessage
  | UserRelationChanged
  | UserSessionRequest
  | UserStatusChanged
  | null {
  switch (ServerPayload[type]) {
    case 'NONE':
      return null;
    case 'ready':
      return accessor(index, new ServerReady())! as ServerReady;
    case 'heartbeat':
      return accessor(index, new ServerHeartbeat())! as ServerHeartbeat;
    case 'system_message':
      return accessor(index, new SystemMessage())! as SystemMessage;
    case 'user_status_changed':
      return accessor(index, new UserStatusChanged())! as UserStatusChanged;
    case 'user_relation_changed':
      return accessor(index, new UserRelationChanged())! as UserRelationChanged;
    case 'user_message':
      return accessor(index, new UserMessage())! as UserMessage;
    case 'user_session_request':
      return accessor(index, new UserSessionRequest())! as UserSessionRequest;
    case 'friend_request_added':
      return accessor(index, new FriendRequestAdded())! as FriendRequestAdded;
    case 'friend_request_removed':
      return accessor(index, new FriendRequestRemoved())! as FriendRequestRemoved;
    case 'group_invite':
      return accessor(index, new GroupInvite())! as GroupInvite;
    case 'group_added':
      return accessor(index, new GroupAdded())! as GroupAdded;
    case 'group_removed':
      return accessor(index, new GroupRemoved())! as GroupRemoved;
    case 'group_title_changed':
      return accessor(index, new GroupTitleChanged())! as GroupTitleChanged;
    case 'group_icon_changed':
      return accessor(index, new GroupIconChanged())! as GroupIconChanged;
    case 'group_participant_added':
      return accessor(index, new GroupParticipantAdded())! as GroupParticipantAdded;
    case 'group_participant_removed':
      return accessor(index, new GroupParticipantRemoved())! as GroupParticipantRemoved;
    case 'group_message':
      return accessor(index, new GroupMessage())! as GroupMessage;
    case 'group_session_request':
      return accessor(index, new GroupSessionRequest())! as GroupSessionRequest;
    case 'session_joined':
      return accessor(index, new SessionEventJoined())! as SessionEventJoined;
    case 'session_user_joined':
      return accessor(index, new SessionEventUserJoined())! as SessionEventUserJoined;
    case 'session_user_left':
      return accessor(index, new SessionEventUserLeft())! as SessionEventUserLeft;
    case 'session_invited':
      return accessor(index, new SessionEventInvited())! as SessionEventInvited;
    case 'session_left':
      return accessor(index, new SessionEventLeft())! as SessionEventLeft;
    case 'session_ended':
      return accessor(index, new SessionEventEnded())! as SessionEventEnded;
    case 'session_ice_candidate_discovered':
      return accessor(
        index,
        new SessionEventIceCandidateDiscovered()
      )! as SessionEventIceCandidateDiscovered;
    default:
      return null;
  }
}
