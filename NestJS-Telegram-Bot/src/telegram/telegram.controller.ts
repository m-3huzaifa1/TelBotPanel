import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('api')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('bot/token')
  @HttpCode(200)
  async setBotToken(@Body() data: { token: string }): Promise<{ message: string }> {
    const { token } = data;
    this.telegramService.setBotToken(token);
    return { message: `Bot token ${token} set successfully` };
  }

  @Post('bot/message')
  @HttpCode(200)
  async sendMessage(@Body() data: { msg: string }): Promise<{ message: string }> {
    const { msg } = data;
    this.telegramService.sendBroadcastMessage(msg);
    return { message: 'Message sent successfully' };
  }

  @Get('user/getAllUsers')
  async getAllUsers() {
    const users = await this.telegramService.getAllUser();
    return { users };
  }

  @Post('user/deleteUser')
  @HttpCode(200)
  async deleteUser(@Body() data: { id: string }): Promise<{ message: string }> {
    const { id } = data;
    const users = await this.telegramService.deleteUser(id);
    return { message: `${id} deleted successfully` };
  }

  @Post('user/blockUser')
  @HttpCode(200)
  async blockUser(@Body() data: { id: string, blocked: boolean }): Promise<{ message: string }> {
    const { id, blocked } = data;
    if (blocked) {
        const users = await this.telegramService.unBlockUser(id);
        return { message: `${id} Unblocked successfully` };
    }
    else {
        const users = await this.telegramService.blockUser(id);
        return { message: `${id} Blocked successfully` };
    }
  }

}

  
