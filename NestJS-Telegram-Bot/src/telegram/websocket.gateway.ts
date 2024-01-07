// // websocket.gateway.ts
// import { WebSocketGateway as NestWebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @NestWebSocketGateway()
// export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server
  
//   handleConnection(client: any, ...args: any[]) {
//     // console.log(`Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: any) {
//     // console.log(`Client disconnected: ${client.id}`);
//   }

//   sendChatIdToClient(chatId: string) {
//     this.server.emit('chatId', chatId);
//   }
// }
