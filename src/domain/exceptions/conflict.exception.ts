import { BaseError } from './base.error';

export class ConflictException extends BaseError {
  constructor(response: string | object = {}, message: string = 'Conflict Exception') {
    super(response, message);

    this.message = message;
    this.response = response;
  }
}
