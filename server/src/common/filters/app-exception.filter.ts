import { BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { AppLogger } from '../logger/logger.service';
import { GraphQLError } from 'graphql';
import { ERROR_CODES } from '../exceptions/constant.exception';
import { CustomUnknownError } from '../exceptions/unknow.exception';

@Catch(Error)
export class AppExceptionFilter implements ExceptionFilter {
  private readonly CLASS_NAME = this.constructor.name;

  constructor(private readonly logger: AppLogger) {}

  catch(exception: any) {
    if (this.isValidationException(exception)) {
      const message = exception.response.message.join(', ');
      this.logger.error(message, ERROR_CODES.BAD_REQUEST);

      return new BadRequestException(message, ERROR_CODES.BAD_REQUEST);
    }

    if (exception instanceof GraphQLError) {
      this.logger.error(
        exception.message,
        exception.extensions?.code as string,
      );

      return exception;
    }

    this.logger.error(exception.message, ERROR_CODES.UNKNOWN_ERROR);
    return new CustomUnknownError(exception?.message);
  }

  private isValidationException(exception: any) {
    return Array.isArray(exception?.response?.message);
  }
}
