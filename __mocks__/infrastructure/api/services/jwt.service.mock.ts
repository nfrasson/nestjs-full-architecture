import Chance from 'chance';
import { IJwtService } from '@domain/interfaces/services/jwt.interface';

const chance = new Chance();

export class JwtServiceMock implements IJwtService {
  generateToken(_payload: object): string {
    return chance.string();
  }
}
