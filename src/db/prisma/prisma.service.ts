import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      this.logger.error('Error connecting to the database', error.stack);
    }
  }

  async cleanDatabase(): Promise<void> {
    if (process.env?.NODE_ENV !== 'local') {
      this.logger.warn('Skipping database clean-up. Just running in local environment.');
      return;
    }

    const models = Object.keys(this).filter(key => !key.startsWith('$') && !key.startsWith('_'));

    for (const model of models) {
      try {
        this.logger.log(`Deleting all records from ${model}...`);
        await this[model].deleteMany({});
        this.logger.log(`Successfully deleted all records from ${model}`);
      } catch (error) {
        this.logger.error(`Error deleting records from ${model}`, error.stack);
      }
    }
  }
}
