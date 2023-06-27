// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class SessionEventIceCandidateDiscovered {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): SessionEventIceCandidateDiscovered {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsSessionEventIceCandidateDiscovered(
    bb: flatbuffers.ByteBuffer,
    obj?: SessionEventIceCandidateDiscovered
  ): SessionEventIceCandidateDiscovered {
    return (obj || new SessionEventIceCandidateDiscovered()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  static getSizePrefixedRootAsSessionEventIceCandidateDiscovered(
    bb: flatbuffers.ByteBuffer,
    obj?: SessionEventIceCandidateDiscovered
  ): SessionEventIceCandidateDiscovered {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new SessionEventIceCandidateDiscovered()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  userId(): string | null;
  userId(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  userId(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  candidate(): string | null;
  candidate(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  candidate(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  static startSessionEventIceCandidateDiscovered(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addUserId(builder: flatbuffers.Builder, userIdOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, userIdOffset, 0);
  }

  static addCandidate(builder: flatbuffers.Builder, candidateOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, candidateOffset, 0);
  }

  static endSessionEventIceCandidateDiscovered(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createSessionEventIceCandidateDiscovered(
    builder: flatbuffers.Builder,
    userIdOffset: flatbuffers.Offset,
    candidateOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    SessionEventIceCandidateDiscovered.startSessionEventIceCandidateDiscovered(builder);
    SessionEventIceCandidateDiscovered.addUserId(builder, userIdOffset);
    SessionEventIceCandidateDiscovered.addCandidate(builder, candidateOffset);
    return SessionEventIceCandidateDiscovered.endSessionEventIceCandidateDiscovered(builder);
  }
}