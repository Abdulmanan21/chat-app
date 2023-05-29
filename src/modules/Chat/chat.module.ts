import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { chatProvider } from './chat.provider';
import { MembersModule } from '../members/members.module';

@Module({
  imports:[MembersModule],
  controllers: [ChatController],
  providers: [ChatService,...chatProvider],
  exports:[ChatService]
})
export class ChatModule {}
