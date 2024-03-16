export class CustomHttpException extends Error {
  statusCode: number;
  response: string | object;

  constructor(response: string | object = {}, message: string = 'Internal Server Error') {
    super();

    this.statusCode = 500;
    this.message = message;
    this.response = response;
  }
}
