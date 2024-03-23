import { randomUUID } from 'node:crypto';
import { InvalidInputException } from '@domain/exceptions';

type Errors = string[];

export class User {
  userId: string;
  userFirstname: string;
  userLastname: string;
  userEmail: string;
  userPassword: string;

  constructor(input: {
    userId: string;
    userFirstname: string;
    userLastname: string;
    userEmail: string;
    userPassword: string;
  }) {
    this.userId = input.userId;
    this.userFirstname = input.userFirstname;
    this.userLastname = input.userLastname;
    this.userEmail = input.userEmail;
    this.userPassword = input.userPassword;
  }

  static create(input: { userFirstname: string; userLastname: string; userEmail: string; userPassword: string }): User {
    const user = new User({
      ...input,
      userId: randomUUID(),
    });

    const errors = user.validate();

    if (errors.length > 0) {
      throw new InvalidInputException(errors);
    }

    return user;
  }

  setHashedPassword(hashedPassword: string): void {
    this.userPassword = hashedPassword;
  }

  static validateId(id: string): Errors {
    const errors: Errors = [];

    if (!id) {
      errors.push('User ID is required');
    }

    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(id)) {
      errors.push('User ID format is invalid');
    }

    return errors;
  }

  static validateFirstname(firstname: string): Errors {
    const errors: Errors = [];

    if (!firstname) {
      errors.push('User first name is required');
    }

    if (firstname?.length < 2) {
      errors.push('User first name must be at least 2 characters long');
    }

    if (firstname?.length > 50) {
      errors.push('User first name must be at most 50 characters long');
    }

    return errors;
  }

  static validateLastname(lastname: string): Errors {
    const errors: Errors = [];

    if (!lastname) {
      errors.push('User last name is required');
    }

    if (lastname?.length < 2) {
      errors.push('User last name must be at least 2 characters long');
    }

    if (lastname?.length > 50) {
      errors.push('User last name must be at most 50 characters long');
    }

    return errors;
  }

  static validateEmail(email: string): Errors {
    const errors: Errors = [];

    if (!email) {
      errors.push('User email is required');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('User email format is invalid');
    }

    return errors;
  }

  static validatePassword(password: string): Errors {
    const errors: Errors = [];

    if (!password) {
      errors.push('User password is required');
    }

    if (password?.length < 8) {
      errors.push('User password must be at least 8 characters long');
    }

    if (password?.length > 50) {
      errors.push('User password must be at most 50 characters long');
    }

    return errors;
  }

  validate(): Errors {
    const errors: Errors = [];

    errors.push(...User.validateId(this.userId));
    errors.push(...User.validateFirstname(this.userFirstname));
    errors.push(...User.validateLastname(this.userLastname));
    errors.push(...User.validateEmail(this.userEmail));
    errors.push(...User.validatePassword(this.userPassword));

    return errors;
  }
}
