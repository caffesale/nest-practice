import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsers } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  findAll() {
    throw new HttpException(
      {
        response:
          'Unable to process your request at the moment, please try later',
        status: HttpStatus.MOVED_PERMANENTLY,
        erorr: 'The API endpoint has been moved to a new location',
        fildName: 'users.service.ts',
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        description: 'Occured because the API endpoint permanently moved',
      },
    );
  }

  public async findOneById(id: number) {
    let user: User | null = null;
    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        { description: 'Database timeout or other error' },
      );
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.usersRepository.findOneBy({ id });
  }

  public async createManyUsers(createUserDto: CreateManyUsers) {
    return await this.usersCreateManyProvider.createMany(createUserDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }
}
