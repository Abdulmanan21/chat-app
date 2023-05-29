import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Members } from 'src/database/entities/members.entity';

@Injectable()
export class MembersService {
  constructor(@Inject('memberrepo') private readonly memberrepo:typeof Members){}
  async create(createMemberDto: CreateMemberDto) {
    
  const members= await  this.findone(createMemberDto.userId,createMemberDto.userId)
  if(!members){ return await this.memberrepo.create(createMemberDto)}
 
  }
  async findone(userId:number,conversationId:number) {
    
    
    return await this.memberrepo.findOne({where:{userId,conversationId}})
  }


  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
