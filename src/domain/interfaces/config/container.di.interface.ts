export interface IContainerDI {
  resolve<T>(token: string): T;
  register<T>(token: string, value: T): void;
  registerSingleton<T>(token: string, value: T): void;
}
