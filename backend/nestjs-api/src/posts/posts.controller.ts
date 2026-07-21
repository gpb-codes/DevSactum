import {
  Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Req,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.postsService.findAll(Number(limit) || 20, Number(offset) || 0)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id)
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string, @Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.postsService.findByUser(userId, Number(limit) || 20, Number(offset) || 0)
  }

  @Get('tag/:tag')
  findByTag(@Param('tag') tag: string, @Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.postsService.findByTag(tag, Number(limit) || 20, Number(offset) || 0)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePostDto, @Req() req: any) {
    return this.postsService.create(dto, req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  like(@Param('id') id: string) {
    return this.postsService.like(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id)
  }
}
