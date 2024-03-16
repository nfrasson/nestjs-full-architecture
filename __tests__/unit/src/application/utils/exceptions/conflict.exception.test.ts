import Chance from 'chance';
import { CustomHttpException } from '@application/utils/exceptions/http.exception';
import { ConflictException } from '@application/utils/exceptions/conflict.exception';

const chance = new Chance();

describe('ConflictException', () => {
  it('should create a ConflictException', () => {
    const customMessage = chance.word();
    const customResponse = { [chance.word()]: chance.word() };
    const exception = new ConflictException(customResponse, customMessage);

    expect(exception).toBeInstanceOf(CustomHttpException);

    expect(exception.statusCode).toBe(409);
    expect(exception.message).toBe(customMessage);
    expect(exception.response).toBe(customResponse);
  });

  it('should create a ConflictException with default message and response', () => {
    const exception = new ConflictException();

    expect(exception).toBeInstanceOf(CustomHttpException);

    expect(exception.statusCode).toBe(409);
    expect(exception.message).toBe('Conflict');
    expect(exception.response).toEqual({});
  });
});
