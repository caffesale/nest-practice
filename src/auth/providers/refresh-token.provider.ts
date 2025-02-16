import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { User } from 'src/users/user.entity';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly usersService: UsersService,
    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    // verify the refresh token
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = (await this.usersService.findOneById(sub)) as User;

      // generate new access token and refresh token
      // return the new access token and refresh token
      return await this.generateTokenProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error, {
        description: 'Invalid refresh token',
      });
    }
  }
}
