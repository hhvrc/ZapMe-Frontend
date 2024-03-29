// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class FriendRequestRemoved {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): FriendRequestRemoved {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsFriendRequestRemoved(
    bb: flatbuffers.ByteBuffer,
    obj?: FriendRequestRemoved
  ): FriendRequestRemoved {
    return (obj || new FriendRequestRemoved()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  static getSizePrefixedRootAsFriendRequestRemoved(
    bb: flatbuffers.ByteBuffer,
    obj?: FriendRequestRemoved
  ): FriendRequestRemoved {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new FriendRequestRemoved()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  senderUserId(): string | null;
  senderUserId(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  senderUserId(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  receiverUserId(): string | null;
  receiverUserId(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  receiverUserId(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  static startFriendRequestRemoved(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addSenderUserId(builder: flatbuffers.Builder, senderUserIdOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, senderUserIdOffset, 0);
  }

  static addReceiverUserId(builder: flatbuffers.Builder, receiverUserIdOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, receiverUserIdOffset, 0);
  }

  static endFriendRequestRemoved(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createFriendRequestRemoved(
    builder: flatbuffers.Builder,
    senderUserIdOffset: flatbuffers.Offset,
    receiverUserIdOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    FriendRequestRemoved.startFriendRequestRemoved(builder);
    FriendRequestRemoved.addSenderUserId(builder, senderUserIdOffset);
    FriendRequestRemoved.addReceiverUserId(builder, receiverUserIdOffset);
    return FriendRequestRemoved.endFriendRequestRemoved(builder);
  }
}
