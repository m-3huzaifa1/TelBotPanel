import { Injectable, Logger } from '@nestjs/common';
import { ChatIdService } from './chatId/chatId.service';

const TelegramBot = require('node-telegram-bot-api');
const TELEGRAM_TOKEN = "6431143400:AAE4_KqKUrZ82_tRH7llKRDnJ_pMD8FwbiI" //"6861425354:AAH8F6aRcgD-A88HMHLSNbdsFmq7JQ-GHrI" 
let chatIds = [];
let chatIds2 = [];
let chatIds3 = [];

@Injectable()
export class TelegramService {
    private readonly bot: any
    private logger = new Logger(TelegramService.name)

    constructor(private readonly chatIdService: ChatIdService) {
        this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
        this.bot.onText(/\/start/, this.onStart);
        this.bot.on("message", this.onReceiveMessage)
    }

    onStart = (msg: any) => {
        const chatId = msg.chat.id.toString();
        this.subscribeUser(chatId);
        this.sendMessageToUser(chatId, 'Thank you for subscribing! You will now receive updates.');
    }

    subscribeUser = async (chatId: string) => {
        await this.chatIdService.create(chatId);

    }

    getUser = async () => {
        chatIds = await this.chatIdService.findAll();
        // console.log(chatIds)
    }

    getAllUser = async () => {
        chatIds3 = await this.chatIdService.findAll();
        return chatIds3
    }

    onReceiveMessage = (msg: any) => {
        this.logger.debug(msg)
    }

    sendMessageToUser = (userId: string, message: string) => {
        this.bot.sendMessage(userId, message);
    }

    setBotToken(token: string) {
        // console.log(this.bot.token)
        this.bot.token = token;
        // console.log(this.bot.token)
    }

    sendBroadcastMessage = async(message: string)=>{
        chatIds2 = await this.chatIdService.findAll();
        const unblockedIds = chatIds2?.filter( id => id?.blocked == false )
        unblockedIds.forEach(chatId => {
            this.sendMessageToUser(chatId?.chatId, message);
        });
    }

    deleteUser = async(id: string) => {
        const res = await this.chatIdService.deleteOne(id);
        // console.log(res)
    }

    blockUser = async(id: string) => {
        const res = await this.chatIdService.blockOne(id);
        // console.log("blocked Id: ",res)
    }
    unBlockUser = async(id: string) => {
        const res = await this.chatIdService.unBlockOne(id);
        // console.log("unBlocked Id: ",res)
    }
}

