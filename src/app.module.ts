import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
