import Chance from 'chance';
import { RegisterUserInputDto } from '@application/dto/user';

const chance = new Chance();

export const mockRegisterUserInputDto = (): RegisterUserInputDto => ({
  userEmail: chance.email(),
  userPassword: chance.string(),
  userFirstname: chance.first(),
  userLastname: chance.last(),
});
