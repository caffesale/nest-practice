import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello From NestJs!';
  }

  /**
   * This is a simple method that returns a string.
   */
  Hello(): string {
    return 'Hello From NestJs!';
  }
}
