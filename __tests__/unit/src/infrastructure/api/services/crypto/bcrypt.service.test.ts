import Chance from 'chance';
import { BcryptHandler } from '@infrastructure/api/services/bcrypt/bcrypt.service';

const chance = new Chance();
const bcryptHandler = new BcryptHandler();

describe('BcryptHandler', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = chance.string();
      const hashedPassword = await bcryptHandler.hashPassword(password);

      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword).toBeDefined();
    });
  });

  describe('comparePassword', () => {
    it('should return true for a matching password', async () => {
      const password = chance.string();
      const hashedPassword = await bcryptHandler.hashPassword(password);

      const result = await bcryptHandler.comparePassword(password, hashedPassword);
      expect(result).toBeTruthy();
    });

    it('should return false for a non-matching password', async () => {
      const password = chance.string();
      const wrongPassword = chance.string({ length: password.length + 1 });
      const hashedPassword = await bcryptHandler.hashPassword(password);

      const result = await bcryptHandler.comparePassword(wrongPassword, hashedPassword);
      expect(result).toBeFalsy();
    });
  });
});
