import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName ?? '',
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: FindOneUserByEmailProvider, useValue: {} },
        { provide: CreateUserProvider, useValue: () => mockCreateUserProvider },
        { provide: UsersCreateManyProvider, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('createUser', () => {
      it('should be defined', () => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.createUser).toBeDefined();
      });

      it('should call createUser on CreateUserProvider', async () => {
        const user = await service.createUser({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          password: 'password',
        });
        expect(user.firstName).toEqual('John');
      });
    });
  });
});
