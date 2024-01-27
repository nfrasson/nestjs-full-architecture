import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtHandler } from '@/services/jwt/jwt.service';
import { IJwtHandler } from '@/interfaces/jwt.interface';
import { JwtNestModule } from '../services/jwt/jwt.module';
import { PrismaService } from '@/db/prisma/prisma.service';
import { IUserRepository } from '@/interfaces/user.interface';
import { BcryptModule } from '../services/crypto/bcrypt.module';
import { ICryptoHandler } from '@/interfaces/crypto.interface';
import { BcryptHandler } from '@/services/crypto/bcrypt.service';
import { UserPrismaRepository } from '@/db/prisma/repositories/user.prisma.repository';

@Module({
  imports: [BcryptModule, JwtNestModule],
  providers: [
    PrismaService,
    {
      provide: UserPrismaRepository,
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: UserService,
      useFactory: (jwtHandler: IJwtHandler, cryptoService: ICryptoHandler, userRepository: IUserRepository) => {
        return new UserService(jwtHandler, cryptoService, userRepository);
      },
      inject: [JwtHandler, BcryptHandler, UserPrismaRepository],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
