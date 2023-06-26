// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class SessionEventLeft {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): SessionEventLeft {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsSessionEventLeft(
    bb: flatbuffers.ByteBuffer,
    obj?: SessionEventLeft
  ): SessionEventLeft {
    return (obj || new SessionEventLeft()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsSessionEventLeft(
    bb: flatbuffers.ByteBuffer,
    obj?: SessionEventLeft
  ): SessionEventLeft {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new SessionEventLeft()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  sessionId(): string | null;
  sessionId(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  sessionId(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  static startSessionEventLeft(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addSessionId(builder: flatbuffers.Builder, sessionIdOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, sessionIdOffset, 0);
  }

  static endSessionEventLeft(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createSessionEventLeft(
    builder: flatbuffers.Builder,
    sessionIdOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    SessionEventLeft.startSessionEventLeft(builder);
    SessionEventLeft.addSessionId(builder, sessionIdOffset);
    return SessionEventLeft.endSessionEventLeft(builder);
  }
}
