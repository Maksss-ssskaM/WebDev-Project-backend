import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Message } from './models/message.models';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { GetNewsResponse } from '../news/response';
import { GetMessagesResponse } from './response';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiTags('API')
  @ApiOperation({ summary: 'Get Messages' })
  @ApiResponse({ status: 200, type: [GetMessagesResponse] })
  @Get('get')
  getReviews(): Promise<Message[]> {
    return this.messageService.getMessages();
  }
}
