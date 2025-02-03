import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    return '';
    // Check user exists database
    // login
    // token
  }

  public isAuth() {
    return true;
  }
}
