import Chance from 'chance';
import { User } from '@domain/entities/user.entity';
import { InvalidInputException } from '@domain/exceptions';

const chance = new Chance();

describe('User', () => {
  describe('constructor', () => {
    it('should create instance of User', () => {
      const userData = {
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      };

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
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const hashedPassword = chance.string();
      user.setHashedPassword(hashedPassword);

      expect(user.userPassword).toBe(hashedPassword);
    });
  });

  describe('validate', () => {
    it('should return empty array', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toEqual([]);
    });

    it('should return errors when userId is not provided', () => {
      const user = new User({
        userId: '',
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User ID is required');
    });

    it('should return errors when userId is not a valid UUID', () => {
      const user = new User({
        userId: chance.string(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User ID is required');
    });

    it('should return errors when userFirstname is not provided', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: '',
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User first name is required');
    });

    it('should return errors when userFirstname is less than 2 characters', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.character(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User first name is required');
    });

    it('should return errors when userFirstname is more than 50 characters', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.string({ length: 51 }),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User first name is required');
    });

    it('should return errors when userLastname is not provided', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: '',
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User last name is required');
    });

    it('should return errors when userLastname is less than 2 characters', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.character(),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User last name is required');
    });

    it('should return errors when userLastname is more than 50 characters', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.string({ length: 51 }),
        userEmail: chance.email(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User last name is required');
    });

    it('should return errors when userEmail is not provided', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: '',
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User email is required');
    });

    it('should return errors when userEmail is less than 5 characters', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.string({ length: 4 }),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User email is required');
    });

    it('should return errors when userEmail is more than 50 characters', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.string({ length: 51 }),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User email is required');
    });

    it('should return errors when userEmail does not contain @', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.string(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User email is required');
    });

    it('should return errors when userEmail does not contain .', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.string(),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User email is required');
    });

    it('should return errors when userEmail contains space', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email().replace('@', ' @'),
        userPassword: chance.string(),
      });

      const errors = user.validate();

      expect(errors).toContain('User email is required');
    });

    it('should return errors when userPassword is not provided', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: '',
      });

      const errors = user.validate();

      expect(errors).toContain('User password is required');
    });

    it('should return errors when userPassword is less than 8 characters', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string({ length: 7 }),
      });

      const errors = user.validate();

      expect(errors).toContain('User password is required');
    });

    it('should return errors when userPassword is more than 50 characters', () => {
      const user = new User({
        userId: chance.guid(),
        userFirstname: chance.first(),
        userLastname: chance.last(),
        userEmail: chance.email(),
        userPassword: chance.string({ length: 51 }),
      });

      const errors = user.validate();

      expect(errors).toContain('User password is required');
    });
  });
});
