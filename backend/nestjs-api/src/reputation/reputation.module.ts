import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReputationController } from './reputation.controller'
import { ReputationService } from './reputation.service'
import { ReputationProfile, ReputationEvent } from './entities/reputation.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ReputationProfile, ReputationEvent]), AuthModule],
  controllers: [ReputationController],
  providers: [ReputationService],
  exports: [ReputationService],
})
export class ReputationModule {}
