// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class FriendRequestAdded {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): FriendRequestAdded {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsFriendRequestAdded(
    bb: flatbuffers.ByteBuffer,
    obj?: FriendRequestAdded
  ): FriendRequestAdded {
    return (obj || new FriendRequestAdded()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  static getSizePrefixedRootAsFriendRequestAdded(
    bb: flatbuffers.ByteBuffer,
    obj?: FriendRequestAdded
  ): FriendRequestAdded {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new FriendRequestAdded()).__init(
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

  incoming(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  static startFriendRequestAdded(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addUserId(builder: flatbuffers.Builder, userIdOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, userIdOffset, 0);
  }

  static addIncoming(builder: flatbuffers.Builder, incoming: boolean) {
    builder.addFieldInt8(1, +incoming, +false);
  }

  static endFriendRequestAdded(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createFriendRequestAdded(
    builder: flatbuffers.Builder,
    userIdOffset: flatbuffers.Offset,
    incoming: boolean
  ): flatbuffers.Offset {
    FriendRequestAdded.startFriendRequestAdded(builder);
    FriendRequestAdded.addUserId(builder, userIdOffset);
    FriendRequestAdded.addIncoming(builder, incoming);
    return FriendRequestAdded.endFriendRequestAdded(builder);
  }
}
