import { IJwtService } from '@domain/interfaces/services/jwt.interface';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { LoginUserInputDto, LoginUserResponseDto } from '@application/dto/user';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { UnauthorizedException } from '@application/utils/exceptions/unauthorized.exception';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService,
    private readonly jwtService: IJwtService
  ) {}

  async execute(input: LoginUserInputDto): Promise<LoginUserResponseDto> {
    const user = await this.userRepository.findByEmail(input.userEmail);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.cryptoService.comparePassword(input.userPassword, user.userPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.generateToken(user);

    return { token };
  }
}
