import { ServerPayload } from '../serialization/fbs/server';
import { handleFriendRequestAdded } from './friendRequestAddedHandler';
import { handleFriendRequestRemoved } from './friendRequestRemovedHandler';
import { handleGroupAdded } from './groupAddedHandler';
import { handleGroupIconChanged } from './groupIconChangedHandler';
import { handleGroupInvite } from './groupInviteHandler';
import { handleGroupMessage } from './groupMessageHandler';
import { handleGroupParticipantAdded } from './groupParticipantAddedHandler';
import { handleGroupParticipantRemoved } from './groupParticipantRemovedHandler';
import { handleGroupRemoved } from './groupRemovedHandler';
import { handleGroupSessionRequest } from './groupSessionRequestHandler';
import { handleGroupTitleChanged } from './groupTitleChangedHandler';
import { handleHeartbeat } from './heartbeatHandler';
import { handleInvalidMessage } from './invalidMessageHandler';
import { handleReady } from './readyHandler';
import { handleSessionEnded } from './sessionEndedHandler';
import { handleSessionIceCandidateDiscovered } from './sessionIceCandidateDiscoveredHandler';
import { handleSessionInvited } from './sessionInvitedHandler';
import { handleSessionJoined } from './sessionJoinedHandler';
import { handleSessionLeft } from './sessionLeftHandler';
import { handleSessionUserJoined } from './sessionUserJoinedHandler';
import { handleSessionUserLeft } from './sessionUserLeftHandler';
import { handleSystemMessage } from './systemMessageHandler';
import { handleUserMessage } from './userMessageHandler';
import { handleUserRelationChanged } from './userRelationChangedHandler';
import { handleUserSessionRequest } from './userSessionRequestHandler';
import { handleUserStatusChanged } from './userStatusChangedHandler';
import type { WebSocketMessageHandler } from '$types/WebSocketMessageHandler';

const WebSocketPayloadHandlers: WebSocketMessageHandler[] = new Array<WebSocketMessageHandler>(
  Object.keys(ServerPayload).length / 2
).fill(handleInvalidMessage);

WebSocketPayloadHandlers[ServerPayload.NONE] = handleInvalidMessage;
WebSocketPayloadHandlers[ServerPayload.ready] = handleReady;
WebSocketPayloadHandlers[ServerPayload.heartbeat] = handleHeartbeat;
WebSocketPayloadHandlers[ServerPayload.system_message] = handleSystemMessage;
WebSocketPayloadHandlers[ServerPayload.user_status_changed] = handleUserStatusChanged;
WebSocketPayloadHandlers[ServerPayload.user_relation_changed] = handleUserRelationChanged;
WebSocketPayloadHandlers[ServerPayload.user_message] = handleUserMessage;
WebSocketPayloadHandlers[ServerPayload.user_session_request] = handleUserSessionRequest;
WebSocketPayloadHandlers[ServerPayload.friend_request_added] = handleFriendRequestAdded;
WebSocketPayloadHandlers[ServerPayload.friend_request_removed] = handleFriendRequestRemoved;
WebSocketPayloadHandlers[ServerPayload.group_invite] = handleGroupInvite;
WebSocketPayloadHandlers[ServerPayload.group_added] = handleGroupAdded;
WebSocketPayloadHandlers[ServerPayload.group_removed] = handleGroupRemoved;
WebSocketPayloadHandlers[ServerPayload.group_title_changed] = handleGroupTitleChanged;
WebSocketPayloadHandlers[ServerPayload.group_icon_changed] = handleGroupIconChanged;
WebSocketPayloadHandlers[ServerPayload.group_participant_added] = handleGroupParticipantAdded;
WebSocketPayloadHandlers[ServerPayload.group_participant_removed] = handleGroupParticipantRemoved;
WebSocketPayloadHandlers[ServerPayload.group_message] = handleGroupMessage;
WebSocketPayloadHandlers[ServerPayload.group_session_request] = handleGroupSessionRequest;
WebSocketPayloadHandlers[ServerPayload.session_joined] = handleSessionJoined;
WebSocketPayloadHandlers[ServerPayload.session_user_joined] = handleSessionUserJoined;
WebSocketPayloadHandlers[ServerPayload.session_user_left] = handleSessionUserLeft;
WebSocketPayloadHandlers[ServerPayload.session_invited] = handleSessionInvited;
WebSocketPayloadHandlers[ServerPayload.session_left] = handleSessionLeft;
WebSocketPayloadHandlers[ServerPayload.session_ended] = handleSessionEnded;
WebSocketPayloadHandlers[ServerPayload.session_ice_candidate_discovered] =
  handleSessionIceCandidateDiscovered;

WebSocketPayloadHandlers.forEach((handler, idx) => {
  if (idx !== ServerPayload.NONE && handler === handleInvalidMessage) {
    throw new Error(`Missing message handler for payload type ${idx}`);
  }
});

export default WebSocketPayloadHandlers;
