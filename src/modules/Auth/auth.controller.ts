import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './Jwt-Auth-Guard';
import { Public } from './public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
 // @Public()
 @UseGuards(JwtAuthGuard)
  @Get()
  find(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

}
