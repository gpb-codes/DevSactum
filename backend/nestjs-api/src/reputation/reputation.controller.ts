import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ReputationService } from './reputation.service'

@ApiTags('reputation')
@Controller('reputation')
export class ReputationController {
  constructor(private readonly reputationService: ReputationService) {}

  @Get('user/:userId')
  getProfile(@Param('userId') userId: string) {
    return this.reputationService.getProfile(userId)
  }

  @Get('user/:userId/history')
  getHistory(@Param('userId') userId: string) {
    return this.reputationService.getHistory(userId)
  }

  @Get('leaderboard')
  getLeaderboard(@Query('limit') limit?: string) {
    return this.reputationService.getLeaderboard(Number(limit) || 20)
  }
}
