import { ICryptoService } from '@domain/interfaces/services/crypto.interface';

export const cryptoServiceMock: jest.Mocked<ICryptoService> = {
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
};
