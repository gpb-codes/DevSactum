import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body(new ValidationPipe({ transform: true, whitelist: true })) data: CreatePostDto, @Request() req) {
    const post = await this.postsService.create({ ...data, userId: req.user.id });
    return { post };
  }

  @Get()
  async feed(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const posts = await this.postsService.feed(
      limit ? parseInt(limit, 10) : 20,
      offset ? parseInt(offset, 10) : 0,
    );
    return { posts };
  }

  @Get('user/:userId')
  async findByUser(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const posts = await this.postsService.findByUser(
      userId,
      limit ? parseInt(limit, 10) : 20,
      offset ? parseInt(offset, 10) : 0,
    );
    return { posts };
  }

  @Get('tag/:tag')
  async findByTag(
    @Param('tag') tag: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const posts = await this.postsService.findByTag(
      tag,
      limit ? parseInt(limit, 10) : 20,
      offset ? parseInt(offset, 10) : 0,
    );
    return { posts };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findById(id);
    return { post };
  }

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  async like(@Param('id') id: string) {
    const post = await this.postsService.like(id);
    return { post };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Request() req) {
    await this.postsService.delete(id);
    return { message: 'Post deleted' };
  }
}
