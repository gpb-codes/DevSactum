import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExploreController } from './explore.controller'
import { ExploreService } from './explore.service'
import { Post } from '../posts/entities/post.entity'
import { Community } from '../communities/entities/community.entity'
import { ReputationProfile } from '../reputation/entities/reputation.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Community, ReputationProfile]),
    AuthModule,
  ],
  controllers: [ExploreController],
  providers: [ExploreService],
  exports: [ExploreService],
})
export class ExploreModule {}
