import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class HttpDefautResponseMiddleware<T>
  implements NestInterceptor<T, any>
{
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const isPaginated = data?.pagination

        return {
          success: true,
          message: 'Success',
          data: isPaginated ? data.data : data,
          error: null,
          ...(isPaginated && {
            meta: data.pagination,
          }),
        }
      }),
    )
  }
}
