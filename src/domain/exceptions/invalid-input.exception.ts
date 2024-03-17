import { BaseError } from './base.error';

export class InvalidInputException extends BaseError {
  constructor(response: string | object = {}, message: string = 'InvalidInput Exception') {
    super(response, message);

    this.message = message;
    this.response = response;
  }
}
