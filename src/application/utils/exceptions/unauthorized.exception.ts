import { CustomHttpException } from './http.exception';

export class UnauthorizedException extends CustomHttpException {
  constructor(response: string | object = {}, message: string = 'Unauthorized') {
    super();

    this.statusCode = 401;
    this.message = message;
    this.response = response;
  }
}
