import Chance from 'chance';
import { RegisterUserResponseDto } from '@application/dto/user';

const chance = new Chance();

export const mockRegisterUserResponseDto = (): RegisterUserResponseDto => ({
  token: chance.hash(),
});
