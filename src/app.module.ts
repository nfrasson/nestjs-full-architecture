import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController],
})
export class AppModule {}
