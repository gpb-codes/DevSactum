import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async send(@Body(new ValidationPipe({ transform: true, whitelist: true })) data: CreateMessageDto, @Request() req) {
    const message = await this.messagesService.send(req.user.id, data);
    return { message };
  }

  @Get('direct/:userId1/:userId2')
  @UseGuards(AuthGuard('jwt'))
  async getDirectMessages(
    @Param('userId1') userId1: string,
    @Param('userId2') userId2: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const messages = await this.messagesService.getDirectMessages(
      userId1,
      userId2,
      limit ? parseInt(limit, 10) : 50,
      offset ? parseInt(offset, 10) : 0,
    );
    return { messages };
  }

  @Get('community/:communityId')
  async getCommunityMessages(
    @Param('communityId') communityId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const messages = await this.messagesService.getCommunityMessages(
      communityId,
      limit ? parseInt(limit, 10) : 50,
      offset ? parseInt(offset, 10) : 0,
    );
    return { messages };
  }

  @Get('unread/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getUnreadCount(@Param('userId') userId: string) {
    const count = await this.messagesService.getUnreadCount(userId);
    return { unread_count: count };
  }

  @Post(':id/read')
  @UseGuards(AuthGuard('jwt'))
  async markAsRead(@Param('id') id: string) {
    await this.messagesService.markAsRead(id);
    return { message: 'Marked as read' };
  }
}
