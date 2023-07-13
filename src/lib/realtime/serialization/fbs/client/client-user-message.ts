// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import {
  ClientUserPayload,
  unionListToClientUserPayload,
  unionToClientUserPayload,
} from '../../fbs/client/client-user-payload.js';
import * as flatbuffers from 'flatbuffers';

export class ClientUserMessage {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ClientUserMessage {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsClientUserMessage(
    bb: flatbuffers.ByteBuffer,
    obj?: ClientUserMessage
  ): ClientUserMessage {
    return (obj || new ClientUserMessage()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsClientUserMessage(
    bb: flatbuffers.ByteBuffer,
    obj?: ClientUserMessage
  ): ClientUserMessage {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ClientUserMessage()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  payloadType(): ClientUserPayload {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readUint8(this.bb_pos + offset) : ClientUserPayload.NONE;
  }

  payload<T extends flatbuffers.Table>(obj: any): any | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__union(obj, this.bb_pos + offset) : null;
  }

  static startClientUserMessage(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addPayloadType(builder: flatbuffers.Builder, payloadType: ClientUserPayload) {
    builder.addFieldInt8(0, payloadType, ClientUserPayload.NONE);
  }

  static addPayload(builder: flatbuffers.Builder, payloadOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, payloadOffset, 0);
  }

  static endClientUserMessage(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static finishClientUserMessageBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset) {
    builder.finish(offset);
  }

  static finishSizePrefixedClientUserMessageBuffer(
    builder: flatbuffers.Builder,
    offset: flatbuffers.Offset
  ) {
    builder.finish(offset, undefined, true);
  }

  static createClientUserMessage(
    builder: flatbuffers.Builder,
    payloadType: ClientUserPayload,
    payloadOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    ClientUserMessage.startClientUserMessage(builder);
    ClientUserMessage.addPayloadType(builder, payloadType);
    ClientUserMessage.addPayload(builder, payloadOffset);
    return ClientUserMessage.endClientUserMessage(builder);
  }
}