import { LoginUserInputDto, LoginUserResponseDto } from '@application/usecases/user/login-user.use-case';
import Chance from 'chance';

const chance = new Chance();

export const mockLoginUserUseCase = jest.fn().mockImplementation(() => {
  return {
    execute: jest.fn(),
  };
});

export const mockLoginUserInputDto = (): LoginUserInputDto => ({
  userEmail: chance.email(),
  userPassword: chance.string(),
});

export const mockLoginUserResponseDto = (): LoginUserResponseDto => ({
  token: chance.string(),
});
