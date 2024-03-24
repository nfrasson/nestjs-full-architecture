import { IContainerDI } from '@domain/interfaces/config/container.di.interface';

export const mockContainerDI: jest.Mocked<IContainerDI> = {
  resolve: jest.fn(),
  register: jest.fn(),
  registerSingleton: jest.fn(),
};
