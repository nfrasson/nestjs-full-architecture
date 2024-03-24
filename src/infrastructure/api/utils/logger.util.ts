import pino, { Logger as PinoLogger } from 'pino';
import { ILogger } from '@domain/interfaces/utils/logger.util.interface';

export class Logger implements ILogger {
  private context: string;
  private logger: PinoLogger;

  constructor(context: string) {
    this.logger = pino();
    this.context = context;
  }

  log(message: string, ...args: any[]): void {
    this.logger.info({ context: this.context }, message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.logger.warn({ context: this.context }, message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.logger.error({ context: this.context }, message, ...args);
  }
}
