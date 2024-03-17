import Chance from 'chance';
import { BaseError, InvalidInputException } from '@domain/exceptions';

const chance = new Chance();

describe('InvalidInputException', () => {
  it('should create a InvalidInputException', () => {
    const customMessage = chance.word();
    const customResponse = { [chance.word()]: chance.word() };
    const exception = new InvalidInputException(customResponse, customMessage);

    expect(exception).toBeInstanceOf(BaseError);

    expect(exception.message).toBe(customMessage);
    expect(exception.response).toBe(customResponse);
  });

  it('should create a InvalidInputException with default message and response', () => {
    const exception = new InvalidInputException();

    expect(exception).toBeInstanceOf(BaseError);

    expect(exception.message).toBe('InvalidInput Exception');
    expect(exception.response).toEqual({});
  });
});
