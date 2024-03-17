import Chance from 'chance';
import { BcryptService } from '@application/services/bcrypt.service';

const chance = new Chance();
const bcryptService = new BcryptService();

describe('BcryptService', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = chance.string();
      const hashedPassword = await bcryptService.hashPassword(password);

      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword).toBeDefined();
    });
  });

  describe('comparePassword', () => {
    it('should return true for a matching password', async () => {
      const password = chance.string();
      const hashedPassword = await bcryptService.hashPassword(password);

      const result = await bcryptService.comparePassword(password, hashedPassword);
      expect(result).toBeTruthy();
    });

    it('should return false for a non-matching password', async () => {
      const password = chance.string();
      const wrongPassword = chance.string({ length: password.length + 1 });
      const hashedPassword = await bcryptService.hashPassword(password);

      const result = await bcryptService.comparePassword(wrongPassword, hashedPassword);
      expect(result).toBeFalsy();
    });
  });
});
