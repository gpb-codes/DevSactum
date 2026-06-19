import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommunitiesModule } from './communities/communities.module';
import { MessagesModule } from './messages/messages.module';
import { ReputationModule } from './reputation/reputation.module';
import { AuthModule } from './auth/auth.module';
import { WebSocketModule } from './websocket/websocket.module';
import { JobsModule } from './jobs/jobs.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { FreelanceModule } from './freelance/freelance.module';
import { ValidationModule } from './validation/validation.module';
import { PaymentsModule } from './payments/payments.module';

const useSqlite = process.env.DB_DRIVER !== 'postgres';

@Module({
  imports: [
    TypeOrmModule.forRoot(useSqlite ? {
      type: 'better-sqlite3',
      database: process.env.DB_PATH || 'devsactum.db',
      autoLoadEntities: true,
      synchronize: true,
    } : {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'devsactum',
      password: process.env.DB_PASSWORD || 'devsactum',
      database: process.env.DB_NAME || 'devsactum',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    PostsModule,
    CommunitiesModule,
    MessagesModule,
    ReputationModule,
    AuthModule,
    WebSocketModule,
    JobsModule,
    PortfolioModule,
    FreelanceModule,
    ValidationModule,
    PaymentsModule,
  ],
})
export class AppModule {}
