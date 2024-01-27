import { IsJWT } from "class-validator";

export class LoginUserResponseDto {
  @IsJWT()
  token: string;
}
