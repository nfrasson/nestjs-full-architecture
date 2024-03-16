import { CustomHttpException } from '@application/utils/exceptions/http.exception';
import { Logger, Catch, ArgumentsHost, HttpException, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: CustomHttpException | HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let statusCode = 500;
    let errorResponse: object | string;

    if (exception instanceof CustomHttpException) {
      statusCode = exception.statusCode;
      errorResponse = {
        data: exception.response,
        error: {
          statusCode,
          message: exception.message,
        },
      };
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      errorResponse = {
        error: typeof exceptionResponse === 'object' ? exceptionResponse : { message: exceptionResponse },
      };
    } else {
      errorResponse = {
        error: { message: exception.message || 'Internal server error' },
      };
    }

    if (statusCode >= 500) {
      this.logger.error(`HTTP ${request.method} ${request.url}`, exception.stack, 'AllExceptionsFilter');
    }

    response.status(statusCode).send(errorResponse);
  }
}
