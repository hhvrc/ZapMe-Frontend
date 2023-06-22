import { WebSocketClient } from './WebSocketClient';

function CreatePeerConnection(stunServerList: string[]) {
  return new RTCPeerConnection({
    iceServers: [{ urls: stunServerList.map((s) => 'stun:' + s) }],
  });
}

export class WebRtcClient {
  protected _connection: RTCPeerConnection;
  protected _sessionId: string;
  protected _userId: string;
  protected _localDescription: RTCSessionDescriptionInit;
  protected _remoteDescription: RTCSessionDescription | null;
  protected _webSocketClient: WebSocketClient;

  protected constructor(
    connection: RTCPeerConnection,
    sessionId: string,
    userId: string,
    localDescription: RTCSessionDescriptionInit,
    remoteDescription: RTCSessionDescription | null,
    webSocketClient: WebSocketClient
  ) {
    this._connection = connection;
    this._sessionId = sessionId;
    this._userId = userId;
    this._localDescription = localDescription;
    this._remoteDescription = remoteDescription;
    this._webSocketClient = webSocketClient;

    this._connection.onicecandidate =
      this.HandleIceCandidateDiscovery.bind(this);
  }

  public get SessionId(): string {
    return this._sessionId;
  }

  public get UserId(): string {
    return this._userId;
  }

  public get LocalSDP(): string | null {
    return this._localDescription.sdp ?? null;
  }

  public get IsConnected(): boolean {
    return this._connection.iceConnectionState === 'connected';
  }

  public async AddIceCandidate(candidateJson: string) {
    await this._connection.addIceCandidate(
      new RTCIceCandidate(JSON.parse(candidateJson))
    );
  }

  private async HandleIceCandidateDiscovery(ev: RTCPeerConnectionIceEvent) {
    if (ev.candidate) {
      await this._webSocketClient.SendIceCandidate(ev.candidate);
    }
  }
}

export class WebRtcCallingClient extends WebRtcClient {
  static async Create(
    wsClient: WebSocketClient,
    sessionId: string,
    userId: string,
    stunServerList: string[]
  ) {
    const connection = CreatePeerConnection(stunServerList);

    const localDesc = await connection.createOffer();
    connection.setLocalDescription(localDesc);

    return new WebRtcClient(
      connection,
      sessionId,
      userId,
      localDesc,
      null,
      wsClient
    );
  }

  public async SetRemoteAnswer(remoteAnswer: string) {
    if (this._remoteDescription) {
      throw new Error('Remote answer already set');
    }

    const remoteDesc = new RTCSessionDescription(JSON.parse(remoteAnswer));
    await this._connection.setRemoteDescription(remoteDesc);
  }
}
export class WebRtcAnsweringClient extends WebRtcClient {
  static async Create(
    wsClient: WebSocketClient,
    sessionId: string,
    userId: string,
    stunServerList: string[],
    remoteOffer: string
  ) {
    const connection = CreatePeerConnection(stunServerList);

    const remoteDesc = new RTCSessionDescription(JSON.parse(remoteOffer));
    await connection.setRemoteDescription(remoteDesc);

    const localDesc = await connection.createAnswer();
    connection.setLocalDescription(localDesc);

    return new WebRtcClient(
      connection,
      sessionId,
      userId,
      localDesc,
      remoteDesc,
      wsClient
    );
  }

  public async GetAnswer(remoteAnswer: string) {
    if (this._remoteDescription) {
      throw new Error('Remote description already set');
    }
    const remoteDesc = new RTCSessionDescription(JSON.parse(remoteAnswer));
    await this._connection.setRemoteDescription(remoteDesc);
  }
}
