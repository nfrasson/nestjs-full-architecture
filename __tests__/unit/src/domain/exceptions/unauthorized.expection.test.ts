import Chance from 'chance';
import { BaseError, UnauthorizedException } from '@domain/exceptions';

const chance = new Chance();

describe('UnauthorizedException', () => {
  it('should create a UnauthorizedException', () => {
    const customMessage = chance.word();
    const customResponse = { [chance.word()]: chance.word() };
    const exception = new UnauthorizedException(customResponse, customMessage);

    expect(exception).toBeInstanceOf(BaseError);

    expect(exception.message).toBe(customMessage);
    expect(exception.response).toBe(customResponse);
  });

  it('should create a UnauthorizedException with default message and response', () => {
    const exception = new UnauthorizedException();

    expect(exception).toBeInstanceOf(BaseError);

    expect(exception.message).toBe('Unauthorized Exception');
    expect(exception.response).toEqual({});
  });
});
