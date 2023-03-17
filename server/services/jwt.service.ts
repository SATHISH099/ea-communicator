import jwt, { verify } from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';
import type { RuntimeConfig } from 'nuxt/schema';

export class JwtService {
  private secret: string;
  private config: RuntimeConfig;

  constructor() {
    this.config = useRuntimeConfig();
    this.secret = this.config.apiSecret;
  }

  sign(data: object) {
    return jwt.sign(instanceToPlain(data), this.secret, {
      expiresIn: this.config.session.session.expiryInSeconds,
    });
  }

  verify(token: string) {
    return verify(token, this.secret);
  }

  decode<T>(token: string) {
    return jwt.decode(token) as T;
  }
}
