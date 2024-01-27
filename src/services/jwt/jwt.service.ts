import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { IJwtHandler } from '@/interfaces/jwt.interface';

@Injectable()
export class JwtHandler implements IJwtHandler {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: object): string {
    return this.jwtService.sign(JSON.stringify(payload));
  }

  verifyToken(token: string): object {
    return this.jwtService.verify(token);
  }
}
