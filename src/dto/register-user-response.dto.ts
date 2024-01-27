import { IsJWT } from "class-validator";

export class RegisterUserResponseDto {
  @IsJWT()
  token: string;
}
