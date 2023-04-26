import { Inject, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message.models';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { News } from '../news/models/news.models';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private readonly messageService: typeof Message,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any) {
    const asset = {
      username: body[0],
      message: body[1],
    };
    await this.messageService.create(asset);
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: [`${body[0]}: ${body[1]}`],
    });
  }

  async getMessages(): Promise<Message[]> {
    return await this.messageService.findAll();
  }
}
