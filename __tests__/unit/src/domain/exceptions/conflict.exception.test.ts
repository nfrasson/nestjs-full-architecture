import Chance from 'chance';
import { BaseError, ConflictException } from '@domain/exceptions';

const chance = new Chance();

describe('ConflictException', () => {
  it('should create a ConflictException', () => {
    const customMessage = chance.word();
    const customResponse = { [chance.word()]: chance.word() };
    const exception = new ConflictException(customResponse, customMessage);

    expect(exception).toBeInstanceOf(BaseError);

    expect(exception.message).toBe(customMessage);
    expect(exception.response).toBe(customResponse);
  });

  it('should create a ConflictException with default message and response', () => {
    const exception = new ConflictException();

    expect(exception).toBeInstanceOf(BaseError);

    expect(exception.message).toBe('Conflict Exception');
    expect(exception.response).toEqual({});
  });
});
