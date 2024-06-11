import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../auth/dto/register-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isUserExist = await this.findOne(createUserDto.email);
    if (isUserExist) {
      console.log("User already exist");
      throw new BadRequestException("User already exist");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.role = createUserDto.role;
    user.password = hashedPassword;

    return await this.usersRepository.save(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
