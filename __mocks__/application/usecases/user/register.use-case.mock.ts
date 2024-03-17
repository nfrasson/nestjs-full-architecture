import Chance from 'chance';
import { RegisterUserInputDto, RegisterUserResponseDto } from '@application/usecases/user/register-user.use-case';

const chance = new Chance();

export const mockRegisterUserUseCase = jest.fn().mockImplementation(() => {
  return {
    execute: jest.fn(),
  };
});

export const mockRegisterUserInputDto = (): RegisterUserInputDto => ({
  userEmail: chance.email(),
  userPassword: chance.string({ length: 8 }),
  userFirstname: chance.first(),
  userLastname: chance.last(),
});

export const mockRegisterUserResponseDto = (): RegisterUserResponseDto => ({
  token: chance.string(),
});
