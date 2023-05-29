import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/database/entities/user.entity';
import { conversation } from 'src/database/entities/conversation.entity';

const bcrypt = require('bcryptjs');
@Injectable()
export class UserService {
  constructor(@Inject('userrepo') private readonly userrepo: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    // var salt = bcrypt.genSaltSync(10);
    // createUserDto.password= await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = await this.gensalth(createUserDto.password);

    console.log(createUserDto.password);
    return await this.userrepo.create(createUserDto);
  }

  async findAll() {
    return await this.userrepo.findAll({include:{model:conversation,as :'conversations'}});
  }

  async findOne(id: number) {
    return await this.userrepo.findOne({ where: { id },include:{model:conversation,as :'conversations'} });
  }

  async findOnebyemail(email: string) {
    return await this.userrepo.unscoped().findOne({ where: {email } });
  }



  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    if (updateUserDto.email) {
      user['email'] = updateUserDto.email;
    }
    if (updateUserDto.firstName) {
      user['firstName'] = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user['lastName'] = updateUserDto.lastName;
    }
    if (updateUserDto.password) {
      let pass = await bcrypt.compare(updateUserDto.password, user['password']);
      if (pass) {
        user['password'] = await this.gensalth(updateUserDto.password);
      } else {
        throw new BadRequestException();
      }
      console.log(user);
    }

    return await user.save();

    //return `This action updates a #${pass} user`;
  }

  async remove(id: number) {
    return await this.userrepo.destroy({ where: { id } });
  }

  async gensalth(password: string) {
    var salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  }
}
