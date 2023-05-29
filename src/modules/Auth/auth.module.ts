import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/strategy';

@Module({
  imports:[UserModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_secret,
    signOptions: { expiresIn: '5h' },
  }),],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
