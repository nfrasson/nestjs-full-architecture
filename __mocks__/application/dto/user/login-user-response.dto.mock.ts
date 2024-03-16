import Chance from 'chance';
import { LoginUserResponseDto } from '@application/dto/user';

const chance = new Chance();

export const mockLoginUserResponseDto = (): LoginUserResponseDto => ({
  token: chance.hash(),
});
