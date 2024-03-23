import { JwtService } from '@application/services/jwt.service';
import { BcryptService } from '@application/services/bcrypt.service';
import { ITokenService } from '@domain/interfaces/services/token.interface';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { IContainerDI } from '@domain/interfaces/config/container.di.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { LoginUserUseCase, RegisterUserUseCase } from '@application/usecases/user';
import { UserPrismaRepository } from '@infrastructure/database/repositories/user.prisma.repository';
import { DatabaseService } from '@infrastructure/database/database.service';

export function registerUserDependencies(container: IContainerDI): void {
  container.registerSingleton('ITokenService', JwtService);
  container.registerSingleton('ICryptoService', BcryptService);

  container.register('DatabaseService', {
    useValue: new DatabaseService(),
  });
  container.register('IUserRepository', {
    useFactory: () => {
      const prismaClient = container.resolve<DatabaseService>('DatabaseService');
      return new UserPrismaRepository(prismaClient);
    },
  });

  container.register('LoginUserUseCase', {
    useFactory: () => {
      const userRepository = container.resolve<IUserRepository>('IUserRepository');
      const cryptoService = container.resolve<ICryptoService>('ICryptoService');
      const jwtService = container.resolve<ITokenService>('ITokenService');
      return new LoginUserUseCase(userRepository, cryptoService, jwtService);
    },
  });

  container.register('RegisterUserUseCase', {
    useFactory: () => {
      const userRepository = container.resolve<IUserRepository>('IUserRepository');
      const cryptoService = container.resolve<ICryptoService>('ICryptoService');
      const jwtService = container.resolve<ITokenService>('ITokenService');
      return new RegisterUserUseCase(userRepository, cryptoService, jwtService);
    },
  });
}
