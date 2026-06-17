import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async send(@Body() data: { senderId: string } & Partial<Message>) {
    const { senderId, ...messageData } = data;
    const message = await this.messagesService.send(senderId, messageData);
    return { message };
  }

  @Get('direct/:userId1/:userId2')
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
  async getUnreadCount(@Param('userId') userId: string) {
    const count = await this.messagesService.getUnreadCount(userId);
    return { unread_count: count };
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string) {
    await this.messagesService.markAsRead(id);
    return { message: 'Marked as read' };
  }
}
