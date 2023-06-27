// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import {
  ClientPayload,
  unionListToClientPayload,
  unionToClientPayload,
} from '../../fbs/client/client-payload.js';
import * as flatbuffers from 'flatbuffers';

export class ClientMessage {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ClientMessage {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsClientMessage(bb: flatbuffers.ByteBuffer, obj?: ClientMessage): ClientMessage {
    return (obj || new ClientMessage()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsClientMessage(
    bb: flatbuffers.ByteBuffer,
    obj?: ClientMessage
  ): ClientMessage {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ClientMessage()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  payloadType(): ClientPayload {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readUint8(this.bb_pos + offset) : ClientPayload.NONE;
  }

  payload<T extends flatbuffers.Table>(obj: any): any | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__union(obj, this.bb_pos + offset) : null;
  }

  static startClientMessage(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addPayloadType(builder: flatbuffers.Builder, payloadType: ClientPayload) {
    builder.addFieldInt8(0, payloadType, ClientPayload.NONE);
  }

  static addPayload(builder: flatbuffers.Builder, payloadOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, payloadOffset, 0);
  }

  static endClientMessage(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static finishClientMessageBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset) {
    builder.finish(offset);
  }

  static finishSizePrefixedClientMessageBuffer(
    builder: flatbuffers.Builder,
    offset: flatbuffers.Offset
  ) {
    builder.finish(offset, undefined, true);
  }

  static createClientMessage(
    builder: flatbuffers.Builder,
    payloadType: ClientPayload,
    payloadOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    ClientMessage.startClientMessage(builder);
    ClientMessage.addPayloadType(builder, payloadType);
    ClientMessage.addPayload(builder, payloadOffset);
    return ClientMessage.endClientMessage(builder);
  }
}