import Chance from 'chance';
import { User } from '@domain/entities/user.entity';
import { UnauthorizedException } from '@domain/exceptions';
import { LoginUserUseCase } from '@application/usecases/user';
import { jwtServiceMock } from '@mocks/domain/interfaces/services/jwt.interface.mock';
import { cryptoServiceMock } from '@mocks/domain/interfaces/services/crypto.interface.mock';
import { userRepositoryMock } from '@mocks/domain/interfaces/repositories/user.interface.mock';
import { mockLoginUserInputDto, mockLoginUserResponseDto } from '@mocks/application/usecases/user/login.use-case.mock';
import { mockUser } from '@mocks/domain/entities/user.entity.mock';

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
    const user = {
      userId: chance.guid(),
      userEmail: chance.email(),
      userPassword: chance.string({ length: 8 }),
      userFirstname: chance.first(),
      userLastname: chance.last(),
    };

    userRepositoryMock.findByEmail.mockResolvedValue(new User(user));
    cryptoServiceMock.comparePassword.mockResolvedValue(false);

    const input = mockLoginUserInputDto();

    await expect(useCase.execute(input)).rejects.toThrow(UnauthorizedException);
  });

  it('should return a token if the user is found and the password is valid', async () => {
    const user = mockUser();

    const expectedResponse = mockLoginUserResponseDto();

    jwtServiceMock.generateToken.mockReturnValue(expectedResponse.token);
    userRepositoryMock.findByEmail.mockResolvedValue(user);
    cryptoServiceMock.comparePassword.mockResolvedValue(true);

    const input = mockLoginUserInputDto();

    const result = await useCase.execute(input);

    expect(result).toEqual(expectedResponse);
  });
});
