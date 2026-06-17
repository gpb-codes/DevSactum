import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { Community } from './community.entity';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  async create(@Body() data: Partial<Community> & { userId: string }) {
    const { userId, ...communityData } = data;
    const community = await this.communitiesService.create(communityData, userId);
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
  async join(@Param('id') id: string, @Body('userId') userId: string) {
    await this.communitiesService.join(id, userId);
    return { message: 'Joined community' };
  }

  @Post(':id/leave')
  async leave(@Param('id') id: string, @Body('userId') userId: string) {
    await this.communitiesService.leave(id, userId);
    return { message: 'Left community' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.communitiesService.delete(id);
    return { message: 'Community deleted' };
  }
}
