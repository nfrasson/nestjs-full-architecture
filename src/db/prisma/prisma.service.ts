import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async cleanDatabase(): Promise<void> {
    if (process.env?.NODE_ENV !== 'local') return;

    const models = Object.keys(this).filter(key => !key.startsWith('$') && !key.startsWith('_'));

    for (const model of models) {
      console.log(`Deleting all ${model}...`);
      await this[model].deleteMany({});
    }
  }
}
