import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check is user exists with same email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    // Handle exception
    if (existingUser) throw new Error('user is already exist');

    // create a new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return [
      { firstName: 'John', email: 'john@doe.com' },
      { firstName: 'Alice', email: 'alice@doe.com' },
    ];
  }

  public async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
}
