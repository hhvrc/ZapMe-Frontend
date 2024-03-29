// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import { SystemMessageLevel } from '../../fbs/server/system-message-level.js';
import { SystemMessageType } from '../../fbs/server/system-message-type.js';
import * as flatbuffers from 'flatbuffers';

export class SystemMessage {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): SystemMessage {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsSystemMessage(bb: flatbuffers.ByteBuffer, obj?: SystemMessage): SystemMessage {
    return (obj || new SystemMessage()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsSystemMessage(
    bb: flatbuffers.ByteBuffer,
    obj?: SystemMessage
  ): SystemMessage {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new SystemMessage()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  type(): SystemMessageType {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : SystemMessageType.TOAST;
  }

  level(): SystemMessageLevel {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt8(this.bb_pos + offset) : SystemMessageLevel.INFO;
  }

  title(): string | null;
  title(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  title(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  body(): string | null;
  body(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  body(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  static startSystemMessage(builder: flatbuffers.Builder) {
    builder.startObject(4);
  }

  static addType(builder: flatbuffers.Builder, type: SystemMessageType) {
    builder.addFieldInt8(0, type, SystemMessageType.TOAST);
  }

  static addLevel(builder: flatbuffers.Builder, level: SystemMessageLevel) {
    builder.addFieldInt8(1, level, SystemMessageLevel.INFO);
  }

  static addTitle(builder: flatbuffers.Builder, titleOffset: flatbuffers.Offset) {
    builder.addFieldOffset(2, titleOffset, 0);
  }

  static addBody(builder: flatbuffers.Builder, bodyOffset: flatbuffers.Offset) {
    builder.addFieldOffset(3, bodyOffset, 0);
  }

  static endSystemMessage(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createSystemMessage(
    builder: flatbuffers.Builder,
    type: SystemMessageType,
    level: SystemMessageLevel,
    titleOffset: flatbuffers.Offset,
    bodyOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    SystemMessage.startSystemMessage(builder);
    SystemMessage.addType(builder, type);
    SystemMessage.addLevel(builder, level);
    SystemMessage.addTitle(builder, titleOffset);
    SystemMessage.addBody(builder, bodyOffset);
    return SystemMessage.endSystemMessage(builder);
  }
}
