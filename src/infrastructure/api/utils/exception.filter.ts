/* eslint-disable @typescript-eslint/ban-types */
import { BaseError } from '@domain/exceptions';

export class AllExceptionsFilter {
  // private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: BaseError | Error): void {
    console.error(exception);
  }
  //   const request = ctx.getRequest();
  //   const response = ctx.getResponse();

  //   const { statusCode, errorResponse } = this.handleError(exception);

  //   if (statusCode >= 500) {
  //     this.logger.error(`HTTP ${request.method} ${request.url}`, exception.stack, 'AllExceptionsFilter');
  //   }

  //   response.status(statusCode).send(errorResponse);
  // }

  // private handleError(exception: BaseError | HttpException | Error): {
  //   statusCode: number;
  //   errorResponse: object;
  // } {
  //   if (exception instanceof HttpException) {
  //     return this.handleHttpException(exception);
  //   } else if (exception instanceof BaseError) {
  //     return this.handleBaseError(exception);
  //   } else {
  //     return this.handleGenericError(exception);
  //   }
  // }

  // private statusCodeMap: Map<Function, number> = new Map([
  //   [ConflictException, 409],
  //   [UnauthorizedException, 401],
  //   [InvalidInputException, 400],
  // ]);

  // private handleBaseError(exception: BaseError): { statusCode: number; errorResponse: object } {
  //   const statusCode = this.statusCodeMap.get(exception.constructor) || 500;

  //   const errorResponse = {
  //     status: false,
  //     data: exception.response,
  //     error: exception.message,
  //   };

  //   return { statusCode, errorResponse };
  // }

  // private handleHttpException(exception: HttpException): { statusCode: number; errorResponse: object } {
  //   const statusCode = exception.getStatus();
  //   const response = exception.getResponse();
  //   const errorResponse = {
  //     status: false,
  //     error: typeof response === 'object' ? response : { message: response },
  //   };
  //   return { statusCode, errorResponse };
  // }

  // private handleGenericError(exception: Error): { statusCode: number; errorResponse: object } {
  //   return {
  //     statusCode: 500,
  //     errorResponse: {
  //       status: false,
  //       error: exception.message || 'Internal server error',
  //     },
  //   };
  // }
}
