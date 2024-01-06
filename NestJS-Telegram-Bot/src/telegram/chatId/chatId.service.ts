import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ChatId } from './chatId.model';

@Injectable()
export class ChatIdService {
  constructor(@InjectModel(ChatId.name) private chatIdModel: Model<ChatId>) {}

  async create(chatId: string): Promise<ChatId> {
    const createdChatId = new this.chatIdModel({ chatId });
    return createdChatId.save();
  }

  async findAll(): Promise<ChatId[]> {
    return this.chatIdModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.chatIdModel.findOne({chatId: id}).exec();
    return user
  }

  async deleteOne(id: string): Promise<ChatId[]> {
    await this.chatIdModel.deleteOne({ chatId: id }).exec();
    const remainingChatIds = await this.chatIdModel.find().exec();
    return remainingChatIds;
  }

  async blockOne(id: string) {
    let blockId = await this.chatIdModel.updateOne({ chatId: id },{$set: {blocked: true}}).exec();
    return blockId;
  }

  async unBlockOne(id: string) {
    let blockId = await this.chatIdModel.updateOne({ chatId: id },{$set: {blocked: false}}).exec();
    return blockId;
  }
}
