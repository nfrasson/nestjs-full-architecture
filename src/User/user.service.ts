import { UnauthorizedException, ConflictException, Injectable } from '@nestjs/common';
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
  ) {}

  async loginUser(input: LoginUserInputDto): Promise<LoginUserResponseDto> {
    const user = await this.userRepository.findByEmail(input.userEmail);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.cryptoHandler.comparePassword(input.userPassword, user.userPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtHandler.generateToken(user);

    return { token };
  }

  async registerUser(input: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    const userAlreadyRegistered = await this.userRepository.findByEmail(input.userEmail);

    if (userAlreadyRegistered) {
      throw new ConflictException('Email already exists');
    }

    const user = new User(input);

    const hashedPassword = await this.cryptoHandler.hashPassword(input.userPassword);
    user.userPassword = hashedPassword;

    await this.userRepository.register(user);

    const token = this.jwtHandler.generateToken(user);

    return { token };
  }
}
