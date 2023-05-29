import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { memberprovider } from './member.provider';


@Module({
  
  providers: [MembersService,...memberprovider],
  exports:[MembersService]
})
export class MembersModule {}
