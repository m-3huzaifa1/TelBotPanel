import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ChatId extends Document {
  @Prop({ required: true, unique: true })
  chatId: string;

  @Prop({ default: false })
  blocked: boolean;
}

export const ChatIdSchema = SchemaFactory.createForClass(ChatId);
