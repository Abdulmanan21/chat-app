import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';

import { JwtAuthGuard } from '../Auth/Jwt-Auth-Guard';
import { Request } from 'express';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatService } from '../Chat/chat.service';
import { ParamsTokenFactory } from '@nestjs/core/pipes';

@Controller('message')
export class MessagesController {
  constructor(private readonly messageService: MessagesService,
    ) {}
@UseGuards(JwtAuthGuard)
  @Post(":id")
 async create(@Param('id') id:number, @Body() createMessageDto: CreateMessageDto) {
    
    
    return this.messageService.create(id,createMessageDto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
