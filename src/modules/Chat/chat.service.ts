import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { conversation } from 'src/database/entities/conversation.entity';
import { MembersService } from '../members/members.service';
import { User } from 'src/database/entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Members } from 'src/database/entities/members.entity';
import { where } from 'sequelize';

@Injectable()
export class ChatService {
  constructor(
    @Inject(MembersService) private readonly memberservice: MembersService,
    @Inject(REQUEST) private readonly request: any,
    @Inject('conversation') private readonly conrepo: typeof conversation,
  ) {}
  async create(createChatDto: CreateChatDto, user: any) {
    const con = await this.conrepo.create(createChatDto);
    const members = [];
    user.map(async (userId: number) => {
      const member = {
        userId,
        conversationId: con.id,
      };
      console.log(member);
      members.push(await this.memberservice.create(member));
    });
    return { con, members };
  }

  async findall() {
    console.log(
      '🚀 ~ file: chat.service.ts:37 ~ ChatService ~ findone ~ this.request.user.id:',
      this.request.user.id,
    );
    return await this.conrepo.findAndCountAll({
      // where: {
      //   '$members.user.id$': this.request.user.id,
      // // },
      include: [
        {
          model: Members,
          as: 'membersFiltering',
          where: { userId: this.request.user.id },
          attributes: [],
        },
        {
          model: User,
          as: 'users',
          through: { attributes: [] },
          // separate: true,
          // include: [
          //   {
          //     model: User,
          //   },
          // ],
        },
      ],
      // include: [
      //   {
      //     model: User,
      //     as: 'usersFiltering',
      //     through: { where: { userId: this.request.user.id } },
      //   },
      //   {
      //     model: User,
      //     as: 'users',
      //     separate: true
      //   },
      // ],
    });
  }

  async findone(id: number) {
    return await this.conrepo.findOne({
      where: { id },
      include: [
        {
          model: Members,
          as: 'membersFiltering',
          where: { userId: this.request.user.id },
          attributes: [],
        },
        {
          model: User,
          as: 'users',
          through: { attributes: [] },
          // separate: true,
          // include: [
          //   {
          //     model: User,
          //   },
          // ],
        },
      ],
    });
  }

  async createMessage(recieverId: number){
    // await this.chatrepo.create({})
    // this.socketgateway.sendMessage()
  }

  async remove(id: number) {
    return await this.conrepo.destroy({ where: { id } });
  }
}
