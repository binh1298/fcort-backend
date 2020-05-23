import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data && data.responseStatus) {
          return data;
        }
        Logger.log(
          `Response: \n ${JSON.stringify(data)}`,
          'ResponseDataInterceptor',
        );
        return {
          success: true,
          message: 'Retrieved data successfully',
          data: data,
        };
      })
    );
  }
}
