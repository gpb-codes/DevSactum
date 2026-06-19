import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [ContactModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
