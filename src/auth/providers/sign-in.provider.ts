import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}

  public async singIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // compare password to the hash
    let isEquals: boolean = false;
    try {
      isEquals = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare password',
      });
    }

    if (!isEquals) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return await this.generateTokenProvider.generateTokens(user);
  }
}
