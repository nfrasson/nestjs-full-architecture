import { IsString, IsEmail, Length } from 'class-validator';

export class RegisterUserInputDto {
  @IsString()
  @Length(2, 50)
  userFirstname: string;

  @IsString()
  @Length(2, 50)
  userLastname: string;

  @IsEmail()
  userEmail: string;

  @IsString()
  @Length(6, 100)
  userPassword: string;
}
