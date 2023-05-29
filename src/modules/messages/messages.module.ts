import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { messageProvider } from '../messages/message.provider';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../Auth/auth.module';
import { MessagesController } from './message.controller';
import { ChatModule } from '../Chat/chat.module';

@Module({
  imports:[AuthModule,ChatModule],
  controllers:[MessagesController],
  providers: [MessagesGateway,MessagesService,...messageProvider,],
  exports: [MessagesGateway,MessagesService]
})
export class MessagesModule {}
