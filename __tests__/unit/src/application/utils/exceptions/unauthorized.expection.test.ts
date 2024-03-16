import Chance from 'chance';
import { CustomHttpException } from '@application/utils/exceptions/http.exception';
import { UnauthorizedException } from '@application/utils/exceptions/unauthorized.exception';

const chance = new Chance();

describe('UnauthorizedException', () => {
  it('should create a UnauthorizedException', () => {
    const customMessage = chance.word();
    const customResponse = { [chance.word()]: chance.word() };
    const exception = new UnauthorizedException(customResponse, customMessage);

    expect(exception).toBeInstanceOf(CustomHttpException);

    expect(exception.statusCode).toBe(401);
    expect(exception.message).toBe(customMessage);
    expect(exception.response).toBe(customResponse);
  });

  it('should create a UnauthorizedException with default message and response', () => {
    const exception = new UnauthorizedException();

    expect(exception).toBeInstanceOf(CustomHttpException);

    expect(exception.statusCode).toBe(401);
    expect(exception.message).toBe('Unauthorized');
    expect(exception.response).toEqual({});
  });
});
