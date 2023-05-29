import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { message } from 'src/database/entities/message.entity';
import { MessagesGateway } from './messages.gateway';
import { ChatService } from '../Chat/chat.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class MessagesService {
  userconnected = [];
  constructor(
    private readonly chatService: ChatService,
    private readonly MessageGateway: MessagesGateway,
    @Inject(REQUEST) private readonly request: any,
    @Inject('messageRepo') private readonly messageRepo: typeof message,
  ) {
  
  }
  async create(id: number, createMessageDto: CreateMessageDto) {
    console.log(id);
    const conversation = await this.chatService.findone(id);

    createMessageDto.senderId = this.request.user.id;
    console.log(conversation);
    //  const user=  conversation.users.filter((obj) => {
    //     return obj.id !== this.request.user.id;
    //  })

    const message = {
      message: createMessageDto.message,
      senderId: createMessageDto.senderId,
      conversationId: id,
      recieverId: conversation.users,
    };

    const messages = await this.messageRepo.create({
      message: createMessageDto.message,
      senderId: createMessageDto.senderId,
      conversationId: id,
      recieverId: 2,
    });
    this.MessageGateway.handleSendMessage(message).catch();
    return messages;
  }

  async findAll() {
    return await this.messageRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  async join(payload: any, clientId: any) {
    await this.userconnected.push({ payload, clientId });
  }
}
