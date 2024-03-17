import { hash, compare } from 'bcryptjs';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';

export class BcryptService implements ICryptoService {
  hashPassword(password: string): Promise<string> {
    return hash(password, 5);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
