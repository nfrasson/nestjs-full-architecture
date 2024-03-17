import { User } from '@domain/entities/user.entity';
import { ITokenService } from '@domain/interfaces/services/token.interface';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { InvalidInputException, UnauthorizedException } from '@domain/exceptions';

export type LoginUserInputDto = {
  userEmail: string;
  userPassword: string;
};

export type LoginUserResponseDto = {
  token: string;
};

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService,
    private readonly jwtService: ITokenService
  ) {}

  validateInput(input: LoginUserInputDto): void {
    const errors: string[] = [];

    errors.push(...User.validateEmail(input.userEmail));
    errors.push(...User.validatePassword(input.userPassword));

    if (errors.length > 0) {
      throw new InvalidInputException(errors);
    }
  }

  async execute(input: LoginUserInputDto): Promise<LoginUserResponseDto> {
    this.validateInput(input);

    const user = await this.userRepository.findByEmail(input.userEmail);

    const isPasswordValid = await this.cryptoService.comparePassword(input.userPassword, user?.userPassword || '');

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.generateToken({ userId: user.userId });

    return { token };
  }
}
