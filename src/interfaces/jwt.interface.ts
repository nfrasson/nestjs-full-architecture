export interface IJwtHandler {
  generateToken(payload: object): string;
}
