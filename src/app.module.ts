import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/Auth/auth.module';
import { ChatModule } from './modules/Chat/chat.module';
import { MembersModule } from './modules/members/members.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule,UserModule,AuthModule,ChatModule,MembersModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
