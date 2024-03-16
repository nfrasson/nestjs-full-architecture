import { Module } from '@nestjs/common';
import { BcryptHandler } from './bcrypt.service';

@Module({
  exports: [BcryptHandler],
  providers: [BcryptHandler],
})
export class BcryptModule {}
