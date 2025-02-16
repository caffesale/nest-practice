import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,

    private readonly signInProvider: SignInProvider,

    @Inject()
    private readonly refreshTokensProvider: RefreshTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.singIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
}
