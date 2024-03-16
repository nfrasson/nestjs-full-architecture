import Chance from 'chance';
import { User } from '@domain/entities/user.entity';
import { RegisterUserResponseDto } from '@application/dto/user';
import { RegisterUserUseCase } from '@application/usecases/user';
import { jwtServiceMock } from '@mocks/domain/interfaces/services/jwt.interface.mock';
import { ConflictException } from '@application/utils/exceptions/conflict.exception';
import { cryptoServiceMock } from '@mocks/domain/interfaces/services/crypto.interface.mock';
import { userRepositoryMock } from '@mocks/domain/interfaces/repositories/user.interface.mock';
import { mockRegisterUserInputDto } from '@mocks/application/dto/user/register-user-input.dto.mock';

const chance = new Chance();

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    useCase = new RegisterUserUseCase(userRepositoryMock, cryptoServiceMock, jwtServiceMock);
  });

  it('should throw a ConflictException if the user already exists', async () => {
    userRepositoryMock.findByEmail.mockResolvedValue({} as User);

    const input = mockRegisterUserInputDto();

    await expect(useCase.execute(input)).rejects.toThrow(ConflictException);
  });

  it('should return a token if the user is successfully registered', async () => {
    const user: User = {
      userId: chance.guid(),
      userEmail: chance.email(),
      userPassword: chance.string(),
      userFirstname: chance.first(),
      userLastname: chance.last(),
    };

    const token = chance.hash();

    jwtServiceMock.generateToken.mockReturnValue(token);
    userRepositoryMock.findByEmail.mockResolvedValue(null);
    cryptoServiceMock.hashPassword.mockResolvedValue(user.userPassword);

    const input = mockRegisterUserInputDto();

    const result: RegisterUserResponseDto = await useCase.execute(input);

    expect(result).toEqual({ token });
  });
});
