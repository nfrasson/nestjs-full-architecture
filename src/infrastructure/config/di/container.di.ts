import { container, DependencyContainer, InjectionToken } from 'tsyringe';
import { IContainerDI } from '@domain/interfaces/config/container.di.interface';

export class ContainerDI implements IContainerDI {
  private diContainer: DependencyContainer;

  constructor() {
    this.diContainer = container;
  }

  resolve<T>(token: InjectionToken): T {
    return this.diContainer.resolve(token);
  }

  register<T>(token: InjectionToken, value: T): void {
    this.diContainer.register(token, value as unknown as new () => T);
  }

  registerSingleton<T>(token: InjectionToken, value: T): void {
    this.diContainer.registerSingleton(token, value as unknown as new () => T);
  }
}
