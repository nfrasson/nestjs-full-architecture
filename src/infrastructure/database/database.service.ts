import { PrismaClient } from '@prisma/client';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async cleanDatabase(): Promise<void> {
    if (process.env.NODE_ENV === 'local') {
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
}
