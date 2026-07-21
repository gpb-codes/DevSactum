import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessagesController } from './messages.controller'
import { MessagesService } from './messages.service'
import { Message } from './entities/message.entity'
import { AuthModule } from '../auth/auth.module'
import { QueueModule } from '../queue/queue.module'

@Module({
  imports: [TypeOrmModule.forFeature([Message]), AuthModule, QueueModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
