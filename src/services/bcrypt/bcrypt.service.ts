import { hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { ICryptoHandler } from '@/interfaces/crypto.interface';

@Injectable()
export class BcryptHandler implements ICryptoHandler {
  constructor() {}

  hashPassword(password: string): Promise<string> {
    return hash(password, 8);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
