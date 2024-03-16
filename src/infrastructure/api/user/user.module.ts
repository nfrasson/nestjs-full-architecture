import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtNestModule } from '../services/jwt/jwt.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { IJwtService } from '@domain/interfaces/services/jwt.interface';
import { JwtService } from '@infrastructure/api/services/jwt/jwt.service';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { LoginUserUseCase, RegisterUserUseCase } from '@application/usecases/user';
import { BcryptHandler } from '@infrastructure/api/services/bcrypt/bcrypt.service';
import { UserPrismaRepository } from '@infrastructure/database/repositories/user.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@infrastructure/database/database.service';

@Module({
  imports: [BcryptModule, JwtNestModule],
  providers: [
    UserPrismaRepository,
    {
      provide: UserPrismaRepository,
      useFactory: (prismaClient: PrismaClient) => new UserPrismaRepository(prismaClient),
      inject: [DatabaseService],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepository: IUserRepository, cryptoService: ICryptoService, jwtService: IJwtService) =>
        new LoginUserUseCase(userRepository, cryptoService, jwtService),
      inject: [UserPrismaRepository, BcryptHandler, JwtService],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepository: IUserRepository, cryptoService: ICryptoService, jwtService: IJwtService) =>
        new RegisterUserUseCase(userRepository, cryptoService, jwtService),
      inject: [UserPrismaRepository, BcryptHandler, JwtService],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
