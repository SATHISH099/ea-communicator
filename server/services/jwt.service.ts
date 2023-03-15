import jwt, { verify } from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';

export class JwtService {
  private secret: string;

  constructor() {
    this.secret = useRuntimeConfig().jwtSecret;
    console.log(this.secret);
  }

  sign(data: object) {
    return jwt.sign(instanceToPlain(data), this.secret);
  }

  verify(token: string) {
    return verify(token, this.secret);
  }

  decode<T>(token: string) {
    return jwt.decode(token) as T;
  }
}
