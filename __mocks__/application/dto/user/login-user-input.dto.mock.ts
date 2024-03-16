import Chance from 'chance';
import { LoginUserInputDto } from '@application/dto/user';

const chance = new Chance();

export const mockLoginUserInputDto = (): LoginUserInputDto => ({
  userEmail: chance.email(),
  userPassword: chance.string(),
});
