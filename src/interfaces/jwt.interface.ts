export interface IJwtHandler {
  generateToken(payload: object): string;
  verifyToken(token: string): any;
}
