import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    return '';
  }

  public isAuth() {
    return true;
  }
}
