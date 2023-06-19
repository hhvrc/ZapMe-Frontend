// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class ServerGoodbye {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):ServerGoodbye {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsServerGoodbye(bb:flatbuffers.ByteBuffer, obj?:ServerGoodbye):ServerGoodbye {
  return (obj || new ServerGoodbye()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsServerGoodbye(bb:flatbuffers.ByteBuffer, obj?:ServerGoodbye):ServerGoodbye {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new ServerGoodbye()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

reason():string|null
reason(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
reason(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startServerGoodbye(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addReason(builder:flatbuffers.Builder, reasonOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, reasonOffset, 0);
}

static endServerGoodbye(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createServerGoodbye(builder:flatbuffers.Builder, reasonOffset:flatbuffers.Offset):flatbuffers.Offset {
  ServerGoodbye.startServerGoodbye(builder);
  ServerGoodbye.addReason(builder, reasonOffset);
  return ServerGoodbye.endServerGoodbye(builder);
}
}