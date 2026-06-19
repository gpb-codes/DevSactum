import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  chat(@Body() dto: ChatMessageDto) {
    return this.chatbotService.getResponse(dto.message);
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'devsactum-chatbot' };
  }
}
