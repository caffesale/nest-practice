import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    return next.handle().pipe(
      map<any, { apiVersion: string | undefined; data: unknown }>(
        (data: unknown) => ({
          apiVersion: this.configService.get('appConfig.apiVersion'),
          data: { data },
        }),
      ),
    );
  }
}
