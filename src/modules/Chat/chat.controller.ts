import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtAuthGuard } from '../Auth/Jwt-Auth-Guard';
import { Request } from 'express';
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':id')
  create(@Param('id') userId:number ,@Req() req:Request, @Body() createChatDto: CreateChatDto) {
   const  user=[]
   user.push(+userId)
   const requser :any= req.user
   user.push(requser.id)
 
    return this.chatService.create(createChatDto,user);
  }
  @Get()
  findall(){
    return this.chatService.findall()
  }

  @Get(':id')
  findone(@Param('id') id:number){
    return this.chatService.findone(+id)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
