import Chance from 'chance';
import { User } from '@domain/entities/user.entity';

const chance = new Chance();

export function mockUser(): User {
  return new User({
    userId: chance.guid({ version: 4 }),
    userFirstname: chance.first(),
    userLastname: chance.last(),
    userEmail: chance.email(),
    userPassword: chance.string({ length: 8 }),
  });
}
