// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class GroupParticipantRemoved {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): GroupParticipantRemoved {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsGroupParticipantRemoved(
    bb: flatbuffers.ByteBuffer,
    obj?: GroupParticipantRemoved
  ): GroupParticipantRemoved {
    return (obj || new GroupParticipantRemoved()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  static getSizePrefixedRootAsGroupParticipantRemoved(
    bb: flatbuffers.ByteBuffer,
    obj?: GroupParticipantRemoved
  ): GroupParticipantRemoved {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new GroupParticipantRemoved()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    );
  }

  groupId(): string | null;
  groupId(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  groupId(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  participantId(): string | null;
  participantId(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  participantId(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  static startGroupParticipantRemoved(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addGroupId(builder: flatbuffers.Builder, groupIdOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, groupIdOffset, 0);
  }

  static addParticipantId(builder: flatbuffers.Builder, participantIdOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, participantIdOffset, 0);
  }

  static endGroupParticipantRemoved(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createGroupParticipantRemoved(
    builder: flatbuffers.Builder,
    groupIdOffset: flatbuffers.Offset,
    participantIdOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    GroupParticipantRemoved.startGroupParticipantRemoved(builder);
    GroupParticipantRemoved.addGroupId(builder, groupIdOffset);
    GroupParticipantRemoved.addParticipantId(builder, participantIdOffset);
    return GroupParticipantRemoved.endGroupParticipantRemoved(builder);
  }
}
