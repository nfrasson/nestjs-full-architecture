import Chance from 'chance';
import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from '@infrastructure/api/utils/exception.filter';
import { CustomHttpException } from '@application/utils/exceptions/http.exception';

const chance = new Chance();

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;

  jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllExceptionsFilter],
    }).compile();

    filter = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  it('should handle CustomHttpException correctly', () => {
    const mockException = new CustomHttpException();
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockJson });
    const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
    const mockGetRequest = jest.fn().mockReturnValue({ method: 'GET', url: `/${chance.word}` });
    const mockHost = {
      switchToHttp: () =>
        ({
          getRequest: mockGetRequest,
          getResponse: mockGetResponse,
        }) as unknown as ArgumentsHost,
    };

    filter.catch(mockException, mockHost as unknown as ArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      data: {},
      error: {
        statusCode: 500,
        message: 'Internal Server Error',
      },
    });
  });

  it('should handle HttpException correctly', () => {
    const errorMessage = chance.sentence();
    const mockException = new HttpException(errorMessage, 404);
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockJson });
    const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
    const mockGetRequest = jest.fn().mockReturnValue({ method: 'GET', url: `/${chance.word}` });
    const mockHost = {
      switchToHttp: () =>
        ({
          getRequest: mockGetRequest,
          getResponse: mockGetResponse,
        }) as unknown as ArgumentsHost,
    };

    filter.catch(mockException, mockHost as unknown as ArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        message: errorMessage,
      },
    });
  });

  it('should handle HttpException with object response correctly', () => {
    const errorMessage = chance.sentence();
    const mockException = new HttpException({ message: errorMessage }, 404);
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockJson });
    const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
    const mockGetRequest = jest.fn().mockReturnValue({ method: 'GET', url: `/${chance.word}` });
    const mockHost = {
      switchToHttp: () =>
        ({
          getRequest: mockGetRequest,
          getResponse: mockGetResponse,
        }) as unknown as ArgumentsHost,
    };

    filter.catch(mockException, mockHost as unknown as ArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        message: errorMessage,
      },
    });
  });

  it('should handle generic Error correctly', () => {
    const errorMessage = chance.sentence();
    const mockException = new Error(errorMessage);
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockJson });
    const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
    const mockGetRequest = jest.fn().mockReturnValue({ method: 'GET', url: `/${chance.word}` });
    const mockHost = {
      switchToHttp: () =>
        ({
          getRequest: mockGetRequest,
          getResponse: mockGetResponse,
        }) as unknown as ArgumentsHost,
    };

    filter.catch(mockException, mockHost as unknown as ArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        message: errorMessage,
      },
    });
  });

  it('should handle generic Error with empty message correctly', () => {
    const mockException = new Error();
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockJson });
    const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
    const mockGetRequest = jest.fn().mockReturnValue({ method: 'GET', url: `/${chance.word}` });
    const mockHost = {
      switchToHttp: () =>
        ({
          getRequest: mockGetRequest,
          getResponse: mockGetResponse,
        }) as unknown as ArgumentsHost,
    };

    filter.catch(mockException, mockHost as unknown as ArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      error: {
        message: 'Internal server error',
      },
    });
  });
});
