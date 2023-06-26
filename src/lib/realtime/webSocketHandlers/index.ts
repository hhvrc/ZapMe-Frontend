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

const WebSocketMessageHandlers = new Array(Object.keys(ServerPayload).length / 2).fill(null);

WebSocketMessageHandlers[ServerPayload.NONE] = handleInvalidMessage;
WebSocketMessageHandlers[ServerPayload.ready] = handleReady;
WebSocketMessageHandlers[ServerPayload.heartbeat] = handleHeartbeat;
WebSocketMessageHandlers[ServerPayload.system_message] = handleSystemMessage;
WebSocketMessageHandlers[ServerPayload.user_status_changed] = handleUserStatusChanged;
WebSocketMessageHandlers[ServerPayload.user_relation_changed] = handleUserRelationChanged;
WebSocketMessageHandlers[ServerPayload.user_message] = handleUserMessage;
WebSocketMessageHandlers[ServerPayload.user_session_request] = handleUserSessionRequest;
WebSocketMessageHandlers[ServerPayload.friend_request_added] = handleFriendRequestAdded;
WebSocketMessageHandlers[ServerPayload.friend_request_removed] = handleFriendRequestRemoved;
WebSocketMessageHandlers[ServerPayload.group_invite] = handleGroupInvite;
WebSocketMessageHandlers[ServerPayload.group_added] = handleGroupAdded;
WebSocketMessageHandlers[ServerPayload.group_removed] = handleGroupRemoved;
WebSocketMessageHandlers[ServerPayload.group_title_changed] = handleGroupTitleChanged;
WebSocketMessageHandlers[ServerPayload.group_icon_changed] = handleGroupIconChanged;
WebSocketMessageHandlers[ServerPayload.group_participant_added] = handleGroupParticipantAdded;
WebSocketMessageHandlers[ServerPayload.group_participant_removed] = handleGroupParticipantRemoved;
WebSocketMessageHandlers[ServerPayload.group_message] = handleGroupMessage;
WebSocketMessageHandlers[ServerPayload.group_session_request] = handleGroupSessionRequest;
WebSocketMessageHandlers[ServerPayload.session_joined] = handleSessionJoined;
WebSocketMessageHandlers[ServerPayload.session_user_joined] = handleSessionUserJoined;
WebSocketMessageHandlers[ServerPayload.session_user_left] = handleSessionUserLeft;
WebSocketMessageHandlers[ServerPayload.session_invited] = handleSessionInvited;
WebSocketMessageHandlers[ServerPayload.session_left] = handleSessionLeft;
WebSocketMessageHandlers[ServerPayload.session_ended] = handleSessionEnded;
WebSocketMessageHandlers[ServerPayload.session_ice_candidate_discovered] =
  handleSessionIceCandidateDiscovered;

WebSocketMessageHandlers.forEach((handler, idx) => {
  if (!handler) {
    throw new Error(`Missing message handler for payload type ${idx}`);
  }
});

export default WebSocketMessageHandlers;
