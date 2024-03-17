import { BaseError } from './base.error';

export class UnauthorizedException extends BaseError {
  constructor(response: string | object = {}, message: string = 'Unauthorized Exception') {
    super(response, message);

    this.message = message;
    this.response = response;
  }
}
