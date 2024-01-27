import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserInputDto, RegisterUserInputDto, LoginUserResponseDto, RegisterUserResponseDto } from '../dto/index';
import { IJwtHandler } from '@/interfaces/jwt.interface';
import { ICryptoHandler } from '@/interfaces/crypto.interface';
import { IUserRepository } from '@/interfaces/user.interface';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private jwtHandler: IJwtHandler,
    private cryptoHandler: ICryptoHandler,
    private userRepository: IUserRepository
  ) {
    this.jwtHandler = jwtHandler;
    this.cryptoHandler = cryptoHandler;
    this.userRepository = userRepository;
  }

  async loginUser(LoginUserInputDto: LoginUserInputDto): Promise<LoginUserResponseDto> {
    try {
      const user = await this.userRepository.findByEmail(LoginUserInputDto.userEmail);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await this.cryptoHandler.comparePassword(
        LoginUserInputDto.userPassword,
        user.userPassword
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtHandler.generateToken(user);

      return { token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async registerUser(RegisterUserInputDto: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    const userAlreadyRegistered = await this.userRepository.findByEmail(RegisterUserInputDto.userEmail);

    if (userAlreadyRegistered) {
      throw new UnauthorizedException('Email already exists');
    }

    const user = new User(RegisterUserInputDto);

    const hashedPassword = await this.cryptoHandler.hashPassword(RegisterUserInputDto.userPassword);
    user.userPassword = hashedPassword;

    await this.userRepository.register(user);

    const token = this.jwtHandler.generateToken(user);

    return { token };
  }
}
