import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param';
import { AuthService } from 'src/auth/providers/auth';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      { firstName: 'John', email: 'john@doe.com' },
      { firstName: 'Alice', email: 'alice@doe.com' },
    ];
  }

  findOneById(id: string) {
    return { id, firstName: 'Alice', email: 'alice@doe.com' };
  }
}
