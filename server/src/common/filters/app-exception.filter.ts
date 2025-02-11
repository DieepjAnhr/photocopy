import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    // this.logger.log(ctx);
    const errorMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message;
    console.log(ctx);
    console.log(errorMessage);

    // this.logger.error(errorMessage, 'GraphQLExceptionFilter');

    return exception;
  }
}
