import Chance from 'chance';
import { UserService } from '@/User/user.service';
import { IJwtHandler } from '@/interfaces/jwt.interface';
import { IUserRepository } from '@/interfaces/user.interface';
import { ICryptoService } from '@/interfaces/crypto.interface';
import { JwtHandlerMock } from '@mocks/services/jwt.service.mock';
import { CryptoHandlerMock } from '@mocks/services/bcrypt.service.mock';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryMock } from '@mocks/db/repositories/user.mocked.repository';

const chance = new Chance();

describe('UserService', () => {
  let userService: UserService;
  let jwtHandler: IJwtHandler;
  let cryptoHandler: ICryptoService;
  let userRepository: IUserRepository;

  beforeEach(() => {
    jwtHandler = new JwtHandlerMock();
    cryptoHandler = new CryptoHandlerMock();
    userRepository = new UserRepositoryMock();

    userService = new UserService(jwtHandler, cryptoHandler, userRepository);
  });

  describe('loginUser', () => {
    it('should throw an UnauthorizedException if the user is not found', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      await expect(userService.loginUser({ userEmail: chance.email(), userPassword: chance.string() })).rejects.toThrow(
        UnauthorizedException
      );
    });

    it('should throw an UnauthorizedException if the password is invalid', async () => {
      jest.spyOn(cryptoHandler, 'comparePassword').mockResolvedValue(false);

      await expect(userService.loginUser({ userEmail: chance.email(), userPassword: chance.string() })).rejects.toThrow(
        UnauthorizedException
      );
    });

    it('should return a token if the user is found and the password is valid', async () => {
      jest.spyOn(cryptoHandler, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(jwtHandler, 'generateToken').mockReturnValue(chance.string());

      const response = await userService.loginUser({ userEmail: chance.email(), userPassword: chance.string() });
      expect(response).toHaveProperty('token');
    });
  });

  describe('registerUser', () => {
    it('should throw an ConflictException if the user is already registered', async () => {
      await expect(
        userService.registerUser({
          userEmail: chance.email(),
          userPassword: chance.string(),
          userFirstname: chance.string(),
          userLastname: chance.string(),
        })
      ).rejects.toThrow(ConflictException);
    });

    it('should register the user if the user is not already registered', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'register').mockResolvedValue(null);

      await userService.registerUser({
        userEmail: chance.email(),
        userPassword: chance.string(),
        userFirstname: chance.string(),
        userLastname: chance.string(),
      });

      expect(userRepository.register).toHaveBeenCalled();
    });
  });
});
