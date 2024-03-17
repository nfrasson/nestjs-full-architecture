import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserController } from './user.controller';
import { JwtService } from '@application/services/jwt.service';
import { BcryptService } from '@application/services/bcrypt.service';
import { DatabaseService } from '@infrastructure/database/database.service';
import { ITokenService } from '@domain/interfaces/services/token.interface';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { LoginUserUseCase, RegisterUserUseCase } from '@application/usecases/user';
import { UserPrismaRepository } from '@infrastructure/database/repositories/user.prisma.repository';

@Module({
  providers: [
    JwtService,
    BcryptService,
    UserPrismaRepository,
    {
      provide: UserPrismaRepository,
      useFactory: (prismaClient: PrismaClient) => new UserPrismaRepository(prismaClient),
      inject: [DatabaseService],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepository: IUserRepository, cryptoService: ICryptoService, jwtService: ITokenService) =>
        new LoginUserUseCase(userRepository, cryptoService, jwtService),
      inject: [UserPrismaRepository, BcryptService, JwtService],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepository: IUserRepository, cryptoService: ICryptoService, jwtService: ITokenService) =>
        new RegisterUserUseCase(userRepository, cryptoService, jwtService),
      inject: [UserPrismaRepository, BcryptService, JwtService],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
