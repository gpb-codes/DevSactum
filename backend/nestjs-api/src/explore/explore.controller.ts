import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ExploreService } from './explore.service'

@ApiTags('explore')
@Controller('explore')
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Get()
  getExploreData() {
    return this.exploreService.getExploreData()
  }

  @Get('trending')
  getTrending(@Query('limit') limit?: string) {
    return this.exploreService.getTrending(Number(limit) || 10)
  }

  @Get('feed')
  getFeed(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.exploreService.getFeed(Number(limit) || 20, Number(offset) || 0)
  }

  @Get('communities')
  getCommunities(@Query('limit') limit?: string) {
    return this.exploreService.getTrendingCommunities(Number(limit) || 10)
  }

  @Get('developers')
  getDevelopers(@Query('limit') limit?: string) {
    return this.exploreService.getTopDevelopers(Number(limit) || 10)
  }
}
