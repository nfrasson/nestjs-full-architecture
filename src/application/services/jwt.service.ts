import jsonwebtoken from 'jsonwebtoken';
import { ITokenService } from '@domain/interfaces/services/token.interface';

export class JwtService implements ITokenService {
  generateToken(payload: object): string {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET);
  }
}
