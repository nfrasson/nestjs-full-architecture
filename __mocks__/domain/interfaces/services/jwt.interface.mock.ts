import { IJwtService } from '@domain/interfaces/services/jwt.interface';

export const jwtServiceMock: jest.Mocked<IJwtService> = {
  generateToken: jest.fn(),
};
