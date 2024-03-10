import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtHandler } from '@/services/jwt/jwt.service';
import { IJwtHandler } from '@/interfaces/jwt.interface';
import { JwtNestModule } from '../services/jwt/jwt.module';
import { DatabaseModule } from '@/database/database.module';
import { IUserRepository } from '@/interfaces/user.interface';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { ICryptoService } from '@/interfaces/crypto.interface';
import { BcryptHandler } from '@/services/bcrypt/bcrypt.service';
import { UserPrismaRepository } from '@/database/repositories/user.prisma.repository';

@Module({
  imports: [BcryptModule, JwtNestModule, DatabaseModule],
  providers: [
    UserPrismaRepository,
    {
      provide: UserService,
      useFactory: (jwtHandler: IJwtHandler, cryptoService: ICryptoService, userRepository: IUserRepository) => {
        return new UserService(jwtHandler, cryptoService, userRepository);
      },
      inject: [JwtHandler, BcryptHandler, UserPrismaRepository],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
