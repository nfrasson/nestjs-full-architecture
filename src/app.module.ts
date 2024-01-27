import { Module } from "@nestjs/common";
import { UserModule } from "./User/user.module";
import { DefaultController } from "./default.controller";

@Module({
  imports: [UserModule],
  controllers: [DefaultController],
})
export class AppModule {}
