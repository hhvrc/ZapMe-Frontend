// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class GroupAdded {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): GroupAdded {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsGroupAdded(bb: flatbuffers.ByteBuffer, obj?: GroupAdded): GroupAdded {
    return (obj || new GroupAdded()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsGroupAdded(bb: flatbuffers.ByteBuffer, obj?: GroupAdded): GroupAdded {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new GroupAdded()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  groupId(): string | null;
  groupId(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  groupId(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  groupTitle(): string | null;
  groupTitle(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  groupTitle(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  groupIconUrl(): string | null;
  groupIconUrl(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  groupIconUrl(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  participantIds(index: number): string;
  participantIds(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
  participantIds(index: number, optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset
      ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding)
      : null;
  }

  participantIdsLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  static startGroupAdded(builder: flatbuffers.Builder) {
    builder.startObject(4);
  }

  static addGroupId(builder: flatbuffers.Builder, groupIdOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, groupIdOffset, 0);
  }

  static addGroupTitle(builder: flatbuffers.Builder, groupTitleOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, groupTitleOffset, 0);
  }

  static addGroupIconUrl(builder: flatbuffers.Builder, groupIconUrlOffset: flatbuffers.Offset) {
    builder.addFieldOffset(2, groupIconUrlOffset, 0);
  }

  static addParticipantIds(builder: flatbuffers.Builder, participantIdsOffset: flatbuffers.Offset) {
    builder.addFieldOffset(3, participantIdsOffset, 0);
  }

  static createParticipantIdsVector(
    builder: flatbuffers.Builder,
    data: flatbuffers.Offset[]
  ): flatbuffers.Offset {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]!);
    }
    return builder.endVector();
  }

  static startParticipantIdsVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4);
  }

  static endGroupAdded(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createGroupAdded(
    builder: flatbuffers.Builder,
    groupIdOffset: flatbuffers.Offset,
    groupTitleOffset: flatbuffers.Offset,
    groupIconUrlOffset: flatbuffers.Offset,
    participantIdsOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    GroupAdded.startGroupAdded(builder);
    GroupAdded.addGroupId(builder, groupIdOffset);
    GroupAdded.addGroupTitle(builder, groupTitleOffset);
    GroupAdded.addGroupIconUrl(builder, groupIconUrlOffset);
    GroupAdded.addParticipantIds(builder, participantIdsOffset);
    return GroupAdded.endGroupAdded(builder);
  }
}
