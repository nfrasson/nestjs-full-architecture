import { CustomHttpException } from './http.exception';

export class ConflictException extends CustomHttpException {
  constructor(response: string | object = {}, message: string = 'Conflict') {
    super();

    this.statusCode = 409;
    this.message = message;
    this.response = response;
  }
}
