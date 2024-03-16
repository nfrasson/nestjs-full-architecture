import { User } from '@domain/entities/user.entity';
import { IJwtService } from '@domain/interfaces/services/jwt.interface';
import { ICryptoService } from '@domain/interfaces/services/crypto.interface';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { ConflictException } from '@application/utils/exceptions/conflict.exception';
import { RegisterUserInputDto, RegisterUserResponseDto } from '@application/dto/user';

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptoHandler: ICryptoService,
    private jwtService: IJwtService
  ) {}

  async execute(input: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    const userAlreadyRegistered = await this.userRepository.findByEmail(input.userEmail);

    if (userAlreadyRegistered) {
      throw new ConflictException();
    }

    const user = new User(input);

    const hashedPassword = await this.cryptoHandler.hashPassword(input.userPassword);
    user.userPassword = hashedPassword;

    await this.userRepository.register(user);

    const token = this.jwtService.generateToken(user);

    return { token };
  }
}
