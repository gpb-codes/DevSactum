import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JobsController } from './jobs.controller'
import { JobsService } from './jobs.service'
import { Job, JobApplication, JobBookmark } from './entities/job.entity'
import { AuthModule } from '../auth/auth.module'
import { QueueModule } from '../queue/queue.module'

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobApplication, JobBookmark]), AuthModule, QueueModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
