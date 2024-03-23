import { PrismaClient } from '@prisma/client';

export class DatabaseService extends PrismaClient {
  async cleanDatabase(): Promise<void> {
    if (process.env.NODE_ENV === 'local') {
      const models = Object.keys(this).filter(key => !key.startsWith('$') && !key.startsWith('_') && key !== 'logger');

      for (const model of models) {
        try {
          await this[model].deleteMany({});
        } catch (error) {
          console.error(`Error deleting records from ${model}`, error.stack);
        }
      }
    }
  }
}
