import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [AppController],
  imports: [UserModule, DatabaseModule],
})
export class AppModule {}
