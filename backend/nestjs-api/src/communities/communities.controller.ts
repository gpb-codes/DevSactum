import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body(new ValidationPipe({ transform: true, whitelist: true })) data: CreateCommunityDto, @Request() req) {
    const community = await this.communitiesService.create(data, req.user.id);
    return { community };
  }

  @Get()
  async findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const communities = await this.communitiesService.findAll(
      limit ? parseInt(limit, 10) : 20,
      offset ? parseInt(offset, 10) : 0,
    );
    return { communities };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const community = await this.communitiesService.findById(id);
    return { community };
  }

  @Post(':id/join')
  @UseGuards(AuthGuard('jwt'))
  async join(@Param('id') id: string, @Request() req) {
    await this.communitiesService.join(id, req.user.id);
    return { message: 'Joined community' };
  }

  @Post(':id/leave')
  @UseGuards(AuthGuard('jwt'))
  async leave(@Param('id') id: string, @Request() req) {
    await this.communitiesService.leave(id, req.user.id);
    return { message: 'Left community' };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.communitiesService.delete(id);
    return { message: 'Community deleted' };
  }
}
