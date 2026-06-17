import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommunitiesModule } from './communities/communities.module';
import { MessagesModule } from './messages/messages.module';
import { ReputationModule } from './reputation/reputation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
  ],
})
export class AppModule {}
