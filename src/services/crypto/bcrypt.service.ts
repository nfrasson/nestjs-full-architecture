import { hash, compare } from "bcryptjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptHandler {
  constructor() {}

  hashPassword(password: string): Promise<string> {
    return hash(password, 8);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
