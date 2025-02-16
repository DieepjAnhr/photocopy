import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomBadRequestError } from '../exceptions/bad-request.exception';

@Injectable()
export class QueryOneInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextArgs = context.getArgs();
    const { query } = contextArgs[1];

    if (!query) throw new CustomBadRequestError('Query must be not null!');

    this.handleWhereQuery(query);

    return next.handle().pipe(map((data) => data));
  }

  private handleWhereQuery(query: any) {
    if (!query?.where)
      throw new CustomBadRequestError('Where option must be not null!');

    query.where = JSON.parse(query.where);
  }
}
