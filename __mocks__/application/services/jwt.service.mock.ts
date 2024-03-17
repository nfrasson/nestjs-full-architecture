import Chance from 'chance';
import { ITokenService } from '@domain/interfaces/services/token.interface';

const chance = new Chance();

export class JwtServiceMock implements ITokenService {
  generateToken(_payload: object): string {
    return chance.string();
  }
}
