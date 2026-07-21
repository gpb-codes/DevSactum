import {
  Controller, Get, Post, Body, Param, Query, UseGuards, Req,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { MessagesService } from './messages.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  send(@Body() data: { content: string; receiver_id?: string; community_id?: string }, @Req() req: any) {
    return this.messagesService.send({
      content: data.content,
      senderId: req.user.id,
      receiverId: data.receiver_id,
      communityId: data.community_id,
    })
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('direct/:userId1/:userId2')
  getDirect(
    @Param('userId1') userId1: string,
    @Param('userId2') userId2: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.messagesService.getDirect(userId1, userId2, Number(limit) || 50, Number(offset) || 0)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('community/:communityId')
  getCommunity(
    @Param('communityId') communityId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.messagesService.getCommunity(communityId, Number(limit) || 50, Number(offset) || 0)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('unread/:userId')
  getUnreadCount(@Param('userId') userId: string) {
    return this.messagesService.getUnreadCount(userId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(id)
  }
}
