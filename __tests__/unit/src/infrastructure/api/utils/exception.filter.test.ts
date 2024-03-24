import { Chance } from 'chance';
import { ExceptionFilter } from '@infrastructure/api/utils/exception.filter';
import { Logger } from '@infrastructure/api/utils/logger.util';
import { BaseError, ConflictException, InvalidInputException, UnauthorizedException } from '@domain/exceptions';

const chance = new Chance();

jest.mock('@infrastructure/api/utils/logger.util');

describe('ExceptionFilter', () => {
  let exceptionFilter: ExceptionFilter;

  beforeEach(() => {
    exceptionFilter = new ExceptionFilter();
  });

  describe('catch', () => {
    it('should log error when status code is greater than or equal to 500', () => {
      const statusCode = chance.integer({ min: 500 });
      const exception = new Error();
      const request = { method: chance.string(), url: chance.url() };

      jest.spyOn(exceptionFilter, 'handleError').mockReturnValue({ statusCode, errorResponse: {} });
      const loggerSpy = jest.spyOn(Logger.prototype, 'error');

      exceptionFilter.catch(exception, request);

      expect(loggerSpy).toHaveBeenCalledWith(`HTTP ${request.method} ${request.url}`, exception.stack);
    });

    it('should return status code and error response', () => {
      const statusCode = chance.integer({ min: 400, max: 499 });
      const errorResponse = { message: chance.string() };
      const exception = new Error();
      const request = { method: chance.string(), url: chance.url() };

      jest.spyOn(exceptionFilter, 'handleError').mockReturnValue({ statusCode, errorResponse });

      const result = exceptionFilter.catch(exception, request);

      expect(result).toEqual({ statusCode, errorResponse });
    });
  });

  describe('handleError', () => {
    it('should call handleBaseError when exception is instance of BaseError', () => {
      const exception = new BaseError({ message: chance.string() });

      jest.spyOn(exceptionFilter, 'handleBaseError').mockReturnValue({ statusCode: 500, errorResponse: {} });

      exceptionFilter.handleError(exception);

      expect(exceptionFilter.handleBaseError).toHaveBeenCalledWith(exception);
    });

    it('should call handleGenericError when exception is not instance of BaseError', () => {
      const exception = new Error();

      jest.spyOn(exceptionFilter, 'handleGenericError').mockReturnValue({ statusCode: 500, errorResponse: {} });

      exceptionFilter.handleError(exception);

      expect(exceptionFilter.handleGenericError).toHaveBeenCalledWith(exception);
    });
  });

  describe('handleBaseError', () => {
    it('should handle ConflictException', () => {
      const exception = new ConflictException({ message: chance.string() });

      const result = exceptionFilter.handleBaseError(exception);

      expect(result).toEqual({
        statusCode: 409,
        errorResponse: {
          status: false,
          data: exception.response,
          error: exception.message,
        },
      });
    });

    it('should handle UnauthorizedException', () => {
      const exception = new UnauthorizedException({ message: chance.string() });

      const result = exceptionFilter.handleBaseError(exception);

      expect(result).toEqual({
        statusCode: 401,
        errorResponse: {
          status: false,
          data: exception.response,
          error: exception.message,
        },
      });
    });

    it('should handle InvalidInputException', () => {
      const exception = new InvalidInputException({ message: chance.string() });

      const result = exceptionFilter.handleBaseError(exception);

      expect(result).toEqual({
        statusCode: 400,
        errorResponse: {
          status: false,
          data: exception.response,
          error: exception.message,
        },
      });
    });

    it('should handle other exceptions', () => {
      const exception = new BaseError({ message: chance.string() });

      const result = exceptionFilter.handleBaseError(exception);

      expect(result).toEqual({
        statusCode: 500,
        errorResponse: {
          status: false,
          data: exception.response,
          error: exception.message,
        },
      });
    });
  });

  describe('handleGenericError', () => {
    it('should return 500 status code and error response', () => {
      const exception = new Error(chance.string());

      const result = exceptionFilter.handleGenericError(exception);

      expect(result).toEqual({
        statusCode: 500,
        errorResponse: {
          status: false,
          error: exception.message,
        },
      });
    });

    it('should return 500 status code and default error message when exception message is empty', () => {
      const exception = new Error();

      const result = exceptionFilter.handleGenericError(exception);

      expect(result).toEqual({
        statusCode: 500,
        errorResponse: {
          status: false,
          error: 'Internal server error',
        },
      });
    });
  });
});
