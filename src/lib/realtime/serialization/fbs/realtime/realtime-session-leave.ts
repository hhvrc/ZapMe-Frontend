// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class RealtimeSessionLeave {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): RealtimeSessionLeave {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsRealtimeSessionLeave(
    bb: flatbuffers.ByteBuffer,
    obj?: RealtimeSessionLeave
  ): RealtimeSessionLeave {
    return (obj || new RealtimeSessionLeave()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  static getSizePrefixedRootAsRealtimeSessionLeave(
    bb: flatbuffers.ByteBuffer,
    obj?: RealtimeSessionLeave
  ): RealtimeSessionLeave {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new RealtimeSessionLeave()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  sessionId(): string | null;
  sessionId(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  sessionId(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset
      ? this.bb!.__string(this.bb_pos + offset, optionalEncoding)
      : null;
  }

  static startRealtimeSessionLeave(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addSessionId(
    builder: flatbuffers.Builder,
    sessionIdOffset: flatbuffers.Offset
  ) {
    builder.addFieldOffset(0, sessionIdOffset, 0);
  }

  static endRealtimeSessionLeave(
    builder: flatbuffers.Builder
  ): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createRealtimeSessionLeave(
    builder: flatbuffers.Builder,
    sessionIdOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    RealtimeSessionLeave.startRealtimeSessionLeave(builder);
    RealtimeSessionLeave.addSessionId(builder, sessionIdOffset);
    return RealtimeSessionLeave.endRealtimeSessionLeave(builder);
  }
}
