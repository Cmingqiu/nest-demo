import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;

  // 关联文章表
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Article' })
  article: string; // Article TODO

  @Prop([String])
  roles: string[];

  @Prop({ default: Date.now })
  createTime: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
