import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'

import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { CommunitiesModule } from './communities/communities.module'
import { MessagesModule } from './messages/messages.module'
import { JobsModule } from './jobs/jobs.module'
import { PaymentsModule } from './payments/payments.module'
import { ReputationModule } from './reputation/reputation.module'
import { NotificationsModule } from './notifications/notifications.module'
import { QueueModule } from './queue/queue.module'
import { StorageModule } from './storage/storage.module'
import { WebSocketModule } from './websocket/websocket.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST', 'localhost'),
        port: config.get<number>('POSTGRES_PORT', 5432),
        username: config.get('POSTGRES_USER', 'devsactum'),
        password: config.get('POSTGRES_PASSWORD', 'devsactum'),
        database: config.get('POSTGRES_DB', 'devsactum'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') !== 'production',
      }),
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    ScheduleModule.forRoot(),
    AuthModule,
    PostsModule,
    CommunitiesModule,
    MessagesModule,
    JobsModule,
    PaymentsModule,
    ReputationModule,
    NotificationsModule,
    QueueModule,
    StorageModule,
    WebSocketModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
