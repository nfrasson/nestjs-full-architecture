import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtHandler {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: object): string {
    return this.jwtService.sign(JSON.stringify(payload));
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
