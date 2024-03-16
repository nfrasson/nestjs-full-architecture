import { Injectable } from '@nestjs/common';
import { JwtService as JwtNestService } from '@nestjs/jwt';
import { IJwtService } from '@domain/interfaces/services/jwt.interface';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: JwtNestService) {}

  generateToken(payload: object): string {
    return this.jwtService.sign(JSON.stringify(payload));
  }
}
