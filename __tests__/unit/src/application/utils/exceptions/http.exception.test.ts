import { CustomHttpException } from '@application/utils/exceptions/http.exception';

describe('CustomHttpException', () => {
  it('should create a CustomHttpException', () => {
    const customMessage = 'Custom message';
    const customResponse = { custom: 'response' };
    const exception = new CustomHttpException(customResponse, customMessage);

    expect(exception).toBeInstanceOf(Error);

    expect(exception.statusCode).toBe(500);
    expect(exception.message).toBe(customMessage);
    expect(exception.response).toBe(customResponse);
  });
});
