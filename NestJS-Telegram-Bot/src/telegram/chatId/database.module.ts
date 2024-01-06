import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://m3huzaifa1:Huzaifa123@m3huzaifa1.uwkb6rb.mongodb.net/telegrambot'),
  ],
})
export class DatabaseModule {}
