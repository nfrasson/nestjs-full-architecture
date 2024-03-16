import Chance from 'chance';
import { User } from '@domain/entities/user.entity';
import { LoginUserResponseDto } from '@application/dto/user';
import { LoginUserUseCase } from '@application/usecases/user';
import { jwtServiceMock } from '@mocks/domain/interfaces/services/jwt.interface.mock';
import { cryptoServiceMock } from '@mocks/domain/interfaces/services/crypto.interface.mock';
import { UnauthorizedException } from '@application/utils/exceptions/unauthorized.exception';
import { mockLoginUserInputDto } from '@mocks/application/dto/user/login-user-input.dto.mock';
import { userRepositoryMock } from '@mocks/domain/interfaces/repositories/user.interface.mock';

const chance = new Chance();

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;

  beforeEach(() => {
    useCase = new LoginUserUseCase(userRepositoryMock, cryptoServiceMock, jwtServiceMock);
  });

  it('should throw an UnauthorizedException if the user is not found', async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(null);

    const input = mockLoginUserInputDto();

    await expect(useCase.execute(input)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw an UnauthorizedException if the password is invalid', async () => {
    const user: User = {
      userId: chance.guid(),
      userEmail: chance.email(),
      userPassword: chance.string(),
      userFirstname: chance.first(),
      userLastname: chance.last(),
    };

    userRepositoryMock.findByEmail.mockResolvedValue(user);
    cryptoServiceMock.comparePassword.mockResolvedValue(false);

    const input = mockLoginUserInputDto();

    await expect(useCase.execute(input)).rejects.toThrow(UnauthorizedException);
  });

  it('should return a token if the user is found and the password is valid', async () => {
    const user: User = {
      userId: chance.guid(),
      userEmail: chance.email(),
      userPassword: chance.string(),
      userFirstname: chance.first(),
      userLastname: chance.last(),
    };

    const token = chance.hash();

    jwtServiceMock.generateToken.mockReturnValue(token);
    userRepositoryMock.findByEmail.mockResolvedValue(user);
    cryptoServiceMock.comparePassword.mockResolvedValue(true);

    const input = mockLoginUserInputDto();

    const result: LoginUserResponseDto = await useCase.execute(input);

    expect(result).toEqual({ token });
  });
});
