export class BaseError extends Error {
  response: string | object;

  constructor(response: string | object, message: string = 'Unexpected Error') {
    super(message);

    this.message = message;
    this.response = response;
  }
}
