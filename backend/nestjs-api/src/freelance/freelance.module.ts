import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelanceProject } from './freelance-project.entity';
import { FreelanceBid } from './freelance-bid.entity';
import { FreelanceService } from './freelance.service';
import { FreelanceController } from './freelance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FreelanceProject, FreelanceBid])],
  controllers: [FreelanceController],
  providers: [FreelanceService],
  exports: [FreelanceService],
})
export class FreelanceModule {}
