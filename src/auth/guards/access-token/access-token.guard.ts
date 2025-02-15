import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constans';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * inject jwtService
     */
    private readonly jwtService: JwtService,
    /**
     * inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract request from the execution context
    const request: Request = context.switchToHttp().getRequest();
    // Extract the token from header
    const token = this.extractRequestFromHeader(request);
    // validate the token
    if (!token || !this.validateToken(token)) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<object>(token, {
        secret: this.jwtConfiguration.secret,
      });

      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    const [, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }

  private validateToken(token: string): boolean {
    return false;
  }
}
