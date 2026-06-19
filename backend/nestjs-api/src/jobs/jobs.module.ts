import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { JobApplication } from './job-application.entity';
import { JobBookmark } from './job-bookmark.entity';
import { JobsService } from './jobs.service';
import { JobsController, CompanyController } from './jobs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobApplication, JobBookmark])],
  controllers: [JobsController, CompanyController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
