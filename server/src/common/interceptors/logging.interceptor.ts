import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class HandleRequestInterceptor implements NestInterceptor {
  private readonly CLASS_NAME = this.constructor.name;

  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler<unknown>) {
    const timeStart = Date.now();

    const contextArgs = context.getArgs();

    const { fieldName } = contextArgs[3] ?? { fieldName: 'REST API' };

    return next.handle().pipe(
      tap(() => {
        const timeHandle = Date.now() - timeStart;
        this.logger.debug(
          `${fieldName} request handle using ${timeHandle}ms`,
          `${this.CLASS_NAME} - ${fieldName}`,
        );
      }),
    );
  }
}
