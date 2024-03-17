import { BaseError } from '@domain/exceptions';

describe('BaseError', () => {
  it('should create a BaseError', () => {
    const customResponse = { custom: 'response' };
    const exception = new BaseError(customResponse);

    expect(exception).toBeInstanceOf(Error);

    expect(exception.message).toBe('Unexpected Error');
    expect(exception.response).toBe(customResponse);
  });

  it('should create a BaseError with a custom message', () => {
    const customMessage = 'Custom message';
    const exception = new BaseError({}, customMessage);

    expect(exception).toBeInstanceOf(Error);

    expect(exception.message).toBe(customMessage);
    expect(exception.response).toEqual({});
  });
});
