import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userservice: UserService,
    private jwtService: JwtService,
  ) {}
  async login(createAuthDto: CreateAuthDto) {
    const user = await this.userservice.findOnebyemail(createAuthDto.email);
    let pass = await bcrypt.compare(createAuthDto.password, user['password']);
    console.log(pass);
    if (!pass) {
      throw new NotFoundException('Invalid credentials');
    }
    const payload = {
      id: user.id,
      username: user.firstName,
      lastname: user.lastName,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifytoken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JwtSecret,
    });
    return payload;
  }
}
