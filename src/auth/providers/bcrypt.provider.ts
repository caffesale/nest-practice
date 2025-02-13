import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider extends HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // generate a salt
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
