// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class DeviceCapability {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): DeviceCapability {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsDeviceCapability(
    bb: flatbuffers.ByteBuffer,
    obj?: DeviceCapability
  ): DeviceCapability {
    return (obj || new DeviceCapability()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsDeviceCapability(
    bb: flatbuffers.ByteBuffer,
    obj?: DeviceCapability
  ): DeviceCapability {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new DeviceCapability()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  name(): string | null;
  name(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  name(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  value(): string | null;
  value(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  value(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  static startDeviceCapability(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addName(builder: flatbuffers.Builder, nameOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, nameOffset, 0);
  }

  static addValue(builder: flatbuffers.Builder, valueOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, valueOffset, 0);
  }

  static endDeviceCapability(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createDeviceCapability(
    builder: flatbuffers.Builder,
    nameOffset: flatbuffers.Offset,
    valueOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    DeviceCapability.startDeviceCapability(builder);
    DeviceCapability.addName(builder, nameOffset);
    DeviceCapability.addValue(builder, valueOffset);
    return DeviceCapability.endDeviceCapability(builder);
  }
}
