import { Module } from "@nestjs/common";
import { BcryptHandler } from "./bcrypt.service";

@Module({
  providers: [BcryptHandler],
  exports: [BcryptHandler],
})
export class BcryptModule {}
