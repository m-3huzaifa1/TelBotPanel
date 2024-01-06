import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatId, ChatIdSchema } from './chatId.model';
import { ChatIdService } from './chatId.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ChatId.name, schema: ChatIdSchema }])],
  providers: [ChatIdService],
  exports: [ChatIdService],
})
export class ChatIdModule {}
