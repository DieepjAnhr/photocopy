import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class QueryManyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextArgs = context.getArgs();
    const query = contextArgs[1]?.query ?? {};

    if (Object.keys(query).length > 0) {
      return next.handle().pipe(map((data) => data));
    }

    this.defaultWhereQuery(query);
    this.defaultPaginationQuery(query);
    contextArgs[1].query = query;

    return next.handle().pipe(map((data) => data));
  }

  private defaultWhereQuery(query: any) {
    query.where = query?.where ? JSON.parse(query.where) : {};
  }

  private defaultPaginationQuery(query: any) {
    const paginationDefault = { page: 1, limit: 50 };

    query.pagination = query?.pagination
      ? { ...paginationDefault, ...query.pagination }
      : { ...paginationDefault };
  }
}
