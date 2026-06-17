import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ReputationService } from './reputation.service';

@Controller('reputation')
export class ReputationController {
  constructor(private readonly reputationService: ReputationService) {}

  @Get('user/:userId')
  async getUserReputation(@Param('userId') userId: string) {
    const points = await this.reputationService.getUserReputation(userId);
    return { reputation: points };
  }

  @Get('user/:userId/history')
  async getHistory(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
  ) {
    const events = await this.reputationService.getHistory(
      userId,
      limit ? parseInt(limit, 10) : 20,
    );
    return { events };
  }

  @Get('leaderboard')
  async getLeaderboard(@Query('limit') limit?: string) {
    const leaderboard = await this.reputationService.getLeaderboard(
      limit ? parseInt(limit, 10) : 10,
    );
    return { leaderboard };
  }

  @Post('event')
  async addEvent(@Body() data: { userId: string; points: number; reason: string }) {
    const event = await this.reputationService.addEvent(data.userId, data.points, data.reason);
    return { event };
  }
}
