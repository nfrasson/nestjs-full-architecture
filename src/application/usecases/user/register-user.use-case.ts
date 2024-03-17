import { User } from '@domain/entities/user.entity';
import { ConflictException } from '@domain/exceptions';
import { ITokenService } from '@domain/interfaces/services/token.interface';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';

export type RegisterUserInputDto = {
  userEmail: string;
  userPassword: string;
  userFirstname: string;
  userLastname: string;
};

export type RegisterUserResponseDto = {
  token: string;
};

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptoHandler: ICryptoService,
    private jwtService: ITokenService
  ) {}

  async execute(input: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    const user = User.create(input);

    const userAlreadyRegistered = await this.userRepository.findByEmail(input.userEmail);

    if (userAlreadyRegistered) {
      throw new ConflictException();
    }

    const hashedPassword = await this.cryptoHandler.hashPassword(input.userPassword);

    user.setHashedPassword(hashedPassword);

    await this.userRepository.register(user);

    const token = this.jwtService.generateToken({ userId: user.userId });

    return { token };
  }
}
