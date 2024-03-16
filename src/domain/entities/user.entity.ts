import { randomUUID } from 'node:crypto';

export class User {
  userId: string;
  userFirstname: string;
  userLastname: string;
  userEmail: string;
  userPassword: string;

  constructor(props: Omit<User, 'userId'> & { userId?: string }) {
    Object.assign(this, props);
    this.userId = props?.userId || randomUUID();
  }
}
