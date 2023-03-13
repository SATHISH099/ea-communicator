import jwt from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';

export class JwtService {
  private secret: string;

  constructor() {
    this.secret = useRuntimeConfig().JWT_SECRET;
  }

  sign(data: object) {
    return jwt.sign(instanceToPlain(data), this.secret);
  }
}
