import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constans';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // AuthTypes from the reflector class
    const authTypes: string[] = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];
    // array of guards
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // Loop guards canActivate
    const error = new UnauthorizedException();

    for (const instance of guards) {
      if (typeof instance.canActivate !== 'function') {
        throw new UnauthorizedException('Invalid guard instance');
      }

      const canActivate = await Promise.resolve(
        (instance as CanActivate).canActivate(context),
      ).catch((err) => ({
        error: err;
      }));

      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}
