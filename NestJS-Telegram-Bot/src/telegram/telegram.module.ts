//telegram.module.ts
import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { ChatIdModule } from './chatId/chatId.module';

@Module({
  controllers: [TelegramController], 
  providers: [TelegramService],
  imports: [ChatIdModule], 
})
export class TelegramModule {}
