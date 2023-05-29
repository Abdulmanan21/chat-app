import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/database/entities/user.entity';
import { userProvider } from './user.provider';

@Module({
  imports:[],
  controllers: [UserController],
  providers: [UserService,...userProvider],
  exports:[UserService]
})
export class UserModule {}
