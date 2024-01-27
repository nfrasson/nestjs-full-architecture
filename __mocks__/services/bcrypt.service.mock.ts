import Chance from 'chance';
import { ICryptoHandler } from '@/interfaces/crypto.interface';

const chance = new Chance();

export class CryptoHandlerMock implements ICryptoHandler {
  hashPassword(_password: string): Promise<string> {
    return Promise.resolve(chance.string());
  }

  comparePassword(_password: string, _hash: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
