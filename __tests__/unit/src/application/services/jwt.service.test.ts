import Chance from 'chance';
import jsonwebtoken from 'jsonwebtoken';
import { ITokenService } from '@domain/interfaces/services/token.interface';
import { JwtService } from '@application/services/jwt.service';

const chance = new Chance();
jest.mock('jsonwebtoken');

describe('JwtService', () => {
  let jwtService: ITokenService;

  beforeEach(() => {
    jwtService = new JwtService();
  });

  describe('generateToken', () => {
    it('should generate a token', () => {
      const payload = { userId: chance.guid(), userEmail: chance.email() };
      const mockedToken = chance.string();

      jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => mockedToken);

      const token = jwtService.generateToken(payload);

      expect(jsonwebtoken.sign).toHaveBeenCalledWith(payload, process.env.JWT_SECRET);
      expect(token).toBe(mockedToken);
    });
  });
});
