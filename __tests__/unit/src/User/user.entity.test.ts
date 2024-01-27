import { User } from '@/User/user.entity';
import Chance from 'chance';

const chance = new Chance();

describe('User', () => {
  it('should create a user with a UUID if none is provided', () => {
    const userData = {
      userFirstname: chance.first(),
      userLastname: chance.last(),
      userEmail: chance.email(),
      userPassword: chance.string(),
    };

    const user = new User(userData);

    expect(user.userId).toBeDefined();
    expect(user.userFirstname).toBe(userData.userFirstname);
    expect(user.userLastname).toBe(userData.userLastname);
    expect(user.userEmail).toBe(userData.userEmail);
    expect(user.userPassword).toBe(userData.userPassword);
  });

  it('should create a user with the given userId if provided', () => {
    const customUserId = chance.guid();
    const userData = {
      userId: customUserId,
      userFirstname: chance.first(),
      userLastname: chance.last(),
      userEmail: chance.email(),
      userPassword: chance.string(),
    };

    const user = new User(userData);

    expect(user.userId).toBe(customUserId);
    expect(user.userFirstname).toBe(userData.userFirstname);
    expect(user.userLastname).toBe(userData.userLastname);
    expect(user.userEmail).toBe(userData.userEmail);
    expect(user.userPassword).toBe(userData.userPassword);
  });
});
