import { hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';

@Injectable()
export class BcryptHandler implements ICryptoService {
  constructor() {}

  hashPassword(password: string): Promise<string> {
    return hash(password, 5);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
