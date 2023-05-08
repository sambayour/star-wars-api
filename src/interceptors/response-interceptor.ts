import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  message: string;
  statusCode: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((response) => {
        // console.log('response', response);

        if (response && !(response instanceof Error)) {
          return {
            statusCode: 200,
            message: 'successful',
            data: response,
          };
        } else {
          return {
            statusCode: 400,
            message: 'unsuccessful',
            data: response || {},
          };
        }
      }),
    );
  }
}
