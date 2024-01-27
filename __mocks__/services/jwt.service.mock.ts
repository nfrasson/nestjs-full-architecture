import Chance from 'chance';
import { IJwtHandler } from '@/interfaces/jwt.interface';

const chance = new Chance();

export class JwtHandlerMock implements IJwtHandler {
  generateToken(_payload: object): string {
    return chance.string();
  }

  verifyToken(_token: string): object {
    return { [chance.string()]: chance.string() };
  }
}