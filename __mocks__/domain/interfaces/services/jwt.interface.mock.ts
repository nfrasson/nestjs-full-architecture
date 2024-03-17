import { ITokenService } from '@domain/interfaces/services/token.interface';

export const jwtServiceMock: jest.Mocked<ITokenService> = {
  generateToken: jest.fn(),
};
