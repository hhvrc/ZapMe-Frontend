import { ServerMessage } from '$lib/realtime/serialization/fbs/server';
import { WebSocketClient } from '$lib/realtime/WebSocketClient';

export type WebSocketMessageHandler = (wsClient: WebSocketClient, message: ServerMessage) => void;
