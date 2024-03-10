import { JwtHandler } from '@/services/jwt/jwt.service';
import { JwtService } from '@nestjs/jwt';
import Chance from 'chance';

const chance = new Chance();
jest.mock('@nestjs/jwt');

describe('JwtHandler', () => {
  let jwtHandler: JwtHandler;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: chance.string() });
    jwtHandler = new JwtHandler(jwtService);
  });

  describe('generateToken', () => {
    it('should generate a token', () => {
      const payload = { userId: chance.guid(), userEmail: chance.email() };
      const mockedToken = chance.string();

      jest.spyOn(jwtService, 'sign').mockImplementation(() => mockedToken);

      const token = jwtHandler.generateToken(payload);

      expect(jwtService.sign).toHaveBeenCalledWith(JSON.stringify(payload));
      expect(token).toBe(mockedToken);
    });
  });
});
