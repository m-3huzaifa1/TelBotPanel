import * as mongoose from 'mongoose';

export const ChatIdSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  blocked: { type: Boolean, default: false}
});
