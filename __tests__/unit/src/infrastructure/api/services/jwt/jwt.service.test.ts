import Chance from 'chance';
import { JwtService as JwtNestService } from '@nestjs/jwt';
import { IJwtService } from '@domain/interfaces/services/jwt.interface';
import { JwtService } from '@infrastructure/api/services/jwt/jwt.service';

const chance = new Chance();
jest.mock('@nestjs/jwt');

describe('JwtService', () => {
  let jwtService: IJwtService;
  let jwtNestService: JwtNestService;

  beforeEach(() => {
    jwtNestService = new JwtNestService({ secret: chance.string() });
    jwtService = new JwtService(jwtNestService);
  });

  describe('generateToken', () => {
    it('should generate a token', () => {
      const payload = { userId: chance.guid(), userEmail: chance.email() };
      const mockedToken = chance.string();

      jest.spyOn(jwtNestService, 'sign').mockImplementation(() => mockedToken);

      const token = jwtService.generateToken(payload);

      expect(jwtNestService.sign).toHaveBeenCalledWith(JSON.stringify(payload));
      expect(token).toBe(mockedToken);
    });
  });
});
