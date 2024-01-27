import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtHandler } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [JwtHandler],
  exports: [JwtHandler],
})
export class JwtNestModule {}
