import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class DefaultController {
  constructor() {}

  @Get("healthcheck")
  @HttpCode(204)
  healthCheck(): void {}
}
