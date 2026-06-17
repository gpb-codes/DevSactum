import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() data: Partial<PostEntity>) {
    const post = await this.postsService.create(data);
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findById(id);
    return { post };
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

  @Post(':id/like')
  async like(@Param('id') id: string) {
    const post = await this.postsService.like(id);
    return { post };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.delete(id);
    return { message: 'Post deleted' };
  }
}
