import { IsString, IsEmail, Length } from "class-validator";

export class LoginUserInputDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @Length(6, 100)
  userPassword: string;
}
