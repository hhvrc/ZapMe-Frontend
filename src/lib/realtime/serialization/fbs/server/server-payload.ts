// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

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
import { UserOnlineStatusChanged } from '../../fbs/server/user-online-status-changed.js';
import { UserRelationDetailsUpdated } from '../../fbs/server/user-relation-details-updated.js';
import { UserRelationTypeChanged } from '../../fbs/server/user-relation-type-changed.js';
import { UserSessionRequest } from '../../fbs/server/user-session-request.js';
import { UserStatusMessageChanged } from '../../fbs/server/user-status-message-changed.js';
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
  user_online_status_changed = 4,
  user_status_message_changed = 5,
  user_relation_type_changed = 6,
  user_relation_details_updated = 7,
  user_message = 8,
  user_session_request = 9,
  friend_request_added = 10,
  friend_request_removed = 11,
  group_invite = 12,
  group_added = 13,
  group_removed = 14,
  group_title_changed = 15,
  group_icon_changed = 16,
  group_participant_added = 17,
  group_participant_removed = 18,
  group_message = 19,
  group_session_request = 20,
  session_joined = 21,
  session_user_joined = 22,
  session_user_left = 23,
  session_invited = 24,
  session_left = 25,
  session_ended = 26,
  session_ice_candidate_discovered = 27,
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
      | UserOnlineStatusChanged
      | UserRelationDetailsUpdated
      | UserRelationTypeChanged
      | UserSessionRequest
      | UserStatusMessageChanged
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
    | UserOnlineStatusChanged
    | UserRelationDetailsUpdated
    | UserRelationTypeChanged
    | UserSessionRequest
    | UserStatusMessageChanged
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
  | UserOnlineStatusChanged
  | UserRelationDetailsUpdated
  | UserRelationTypeChanged
  | UserSessionRequest
  | UserStatusMessageChanged
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
    case 'user_online_status_changed':
      return accessor(new UserOnlineStatusChanged())! as UserOnlineStatusChanged;
    case 'user_status_message_changed':
      return accessor(new UserStatusMessageChanged())! as UserStatusMessageChanged;
    case 'user_relation_type_changed':
      return accessor(new UserRelationTypeChanged())! as UserRelationTypeChanged;
    case 'user_relation_details_updated':
      return accessor(new UserRelationDetailsUpdated())! as UserRelationDetailsUpdated;
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
      | UserOnlineStatusChanged
      | UserRelationDetailsUpdated
      | UserRelationTypeChanged
      | UserSessionRequest
      | UserStatusMessageChanged
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
    | UserOnlineStatusChanged
    | UserRelationDetailsUpdated
    | UserRelationTypeChanged
    | UserSessionRequest
    | UserStatusMessageChanged
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
  | UserOnlineStatusChanged
  | UserRelationDetailsUpdated
  | UserRelationTypeChanged
  | UserSessionRequest
  | UserStatusMessageChanged
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
    case 'user_online_status_changed':
      return accessor(index, new UserOnlineStatusChanged())! as UserOnlineStatusChanged;
    case 'user_status_message_changed':
      return accessor(index, new UserStatusMessageChanged())! as UserStatusMessageChanged;
    case 'user_relation_type_changed':
      return accessor(index, new UserRelationTypeChanged())! as UserRelationTypeChanged;
    case 'user_relation_details_updated':
      return accessor(index, new UserRelationDetailsUpdated())! as UserRelationDetailsUpdated;
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
