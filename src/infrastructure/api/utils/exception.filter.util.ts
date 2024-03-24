import { Logger } from './logger.util';
import { BaseError, ConflictException, InvalidInputException, UnauthorizedException } from '@domain/exceptions';

export class ExceptionFilter {
  private readonly logger = new Logger(ExceptionFilter.name);

  catch(
    exception: BaseError | Error,
    request: { method: string; url: string }
  ): { statusCode: number; errorResponse: object } {
    const { statusCode, errorResponse } = this.handleError(exception);

    if (statusCode >= 500) {
      this.logger.error(`HTTP ${request.method} ${request.url}`, exception.stack);
    }

    return { statusCode, errorResponse };
  }

  handleError(exception: BaseError | Error): {
    statusCode: number;
    errorResponse: object;
  } {
    if (exception instanceof BaseError) {
      return this.handleBaseError(exception);
    } else {
      return this.handleGenericError(exception);
    }
  }

  private statusCodeMap: Map<Function, number> = new Map([
    [ConflictException, 409],
    [UnauthorizedException, 401],
    [InvalidInputException, 400],
  ]);

  handleBaseError(exception: BaseError): { statusCode: number; errorResponse: object } {
    const statusCode = this.statusCodeMap.get(exception.constructor) || 500;

    const errorResponse = {
      status: false,
      data: exception.response,
      error: exception.message,
    };

    return { statusCode, errorResponse };
  }

  handleGenericError(exception: Error): { statusCode: number; errorResponse: object } {
    return {
      statusCode: 500,
      errorResponse: {
        status: false,
        error: exception.message || 'Internal server error',
      },
    };
  }
}
