import Chance from 'chance';
import { User } from '@domain/entities/user.entity';
import { InvalidInputException } from '@domain/exceptions';
import { mockUser } from '@mocks/domain/entities/user.entity.mock';

const chance = new Chance();

describe('User', () => {
  describe('constructor', () => {
    it('should create instance of User', () => {
      const userData = mockUser();

      const user = new User(userData);

      expect(user).toBeInstanceOf(User);
      expect(user).toEqual(userData);
    });
  });

  describe('create', () => {
    it('should return void', () => {
      const userData = {
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string({ length: 8 }),
      };

      const user = User.create(userData);

      expect(user.userId).toBeDefined();
      expect(user).toBeInstanceOf(User);
      expect(user).toEqual({
        ...userData,
        userId: user.userId,
      });
    });

    it('should throw error when user data is invalid', () => {
      const userData = {
        userFirstname: chance.character(),
        userLastname: chance.character(),
        userEmail: chance.string(),
        userPassword: chance.string(),
      };

      jest.spyOn(User.prototype, 'validate').mockReturnValueOnce([chance.string()]);

      expect(() => User.create(userData)).toThrow(InvalidInputException);
    });
  });

  describe('setHashedPassword', () => {
    it('should set hashed password', () => {
      const user = mockUser();

      const hashedPassword = chance.string();
      user.setHashedPassword(hashedPassword);

      expect(user.userPassword).toBe(hashedPassword);
    });
  });

  describe('validate', () => {
    it('should return empty array', () => {
      const user = mockUser();

      const errors = user.validate();

      expect(errors).toEqual([]);
    });

    it('should return errors when userId is not provided', () => {
      const user = mockUser({ userId: '' });

      const errors = user.validate();

      expect(errors).toContain('User ID is required');
    });

    it('should return errors when userId is not a valid UUID', () => {
      const user = mockUser({ userId: chance.string() });

      const errors = user.validate();

      expect(errors).toContain('User ID format is invalid');
    });

    it('should return errors when userFirstname is not provided', () => {
      const user = mockUser({ userFirstname: '' });

      const errors = user.validate();

      expect(errors).toContain('User first name is required');
    });

    it('should return errors when userFirstname is less than 2 characters', () => {
      const user = mockUser({ userFirstname: chance.character() });

      const errors = user.validate();

      expect(errors).toContain('User first name must be at least 2 characters long');
    });

    it('should return errors when userFirstname is more than 50 characters', () => {
      const user = mockUser({ userFirstname: chance.string({ length: 51 }) });

      const errors = user.validate();

      expect(errors).toContain('User first name must be at most 50 characters long');
    });

    it('should return errors when userLastname is not provided', () => {
      const user = mockUser({ userLastname: '' });

      const errors = user.validate();

      expect(errors).toContain('User last name is required');
    });

    it('should return errors when userLastname is less than 2 characters', () => {
      const user = mockUser({ userLastname: chance.character() });

      const errors = user.validate();

      expect(errors).toContain('User last name must be at least 2 characters long');
    });

    it('should return errors when userLastname is more than 50 characters', () => {
      const user = mockUser({ userLastname: chance.string({ length: 51 }) });

      const errors = user.validate();

      expect(errors).toContain('User last name must be at most 50 characters long');
    });

    it('should return errors when userEmail is not provided', () => {
      const user = mockUser({ userEmail: '' });

      const errors = user.validate();

      expect(errors).toContain('User email is required');
    });

    it('should return errors when userEmail is in wrong format', () => {
      const user = mockUser({ userEmail: chance.string() });

      const errors = user.validate();

      expect(errors).toContain('User email format is invalid');
    });

    it('should return errors when userPassword is not provided', () => {
      const user = mockUser({ userPassword: '' });

      const errors = user.validate();

      expect(errors).toContain('User password is required');
    });

    it('should return errors when userPassword is less than 8 characters', () => {
      const user = mockUser({ userPassword: chance.string({ length: 7 }) });

      const errors = user.validate();

      expect(errors).toContain('User password must be at least 8 characters long');
    });

    it('should return errors when userPassword is more than 50 characters', () => {
      const user = mockUser({ userPassword: chance.string({ length: 51 }) });

      const errors = user.validate();

      expect(errors).toContain('User password must be at most 50 characters long');
    });
  });
});
