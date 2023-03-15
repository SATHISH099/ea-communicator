import { z } from 'zod';
import type { Repository } from 'typeorm';
import { showError } from 'nuxt/app';
import { TRPCError } from '@trpc/server';
import type { AuthSessionPayload, Session } from '../types';
import { User } from '../database/entities/user/user.entity';
import { Token } from '../database/entities/token/token.entity';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import appDataSource from '~~/server/database/config/app.datasource';

const loggedInDataSchema = z.object({
  data: z.object({
    id: z.number(),
    userId: z.string(),
    email: z.string(),
    status: z.boolean(),
    name: z.string(),
    roles: z.array(z.string()),
    tokenId: z.number(),
    tenantId: z.number(),
  }),
  token: z.string(),
});

export class AuthService {
  private jwtService: JwtService;
  private apiService: ApiService;
  private userRepository: Repository<User>;
  private tokenRepository: Repository<Token>;

  constructor() {
    this.apiService = new ApiService();
    this.jwtService = new JwtService();
    this.userRepository = appDataSource.getRepository(User);
    this.tokenRepository = appDataSource.getRepository(Token);
  }

  async login(token: string, session: Session) {
    const { data, token: accessToken } = await this.apiService
      .post({
        data: { token },
        schema: loggedInDataSchema,
        url: `/auth/sso/verify`,
      })
      .catch((error) => {
        console.error(error);

        return {
          data: null,
          token: null,
        };
      });
    const user = await this.userRepository.findOne({
      where: {
        userId: data?.id,
      },
    });

    if (!user || !accessToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid user',
      });
    }

    const userToken = await this.tokenRepository.save(
      this.tokenRepository.create({
        user,
        accessToken,
      }),
    );

    const sessionPayload: AuthSessionPayload = {
      id: user.id,
      status: user.status,
      name: data.name,
      email: data.email,
      roles: data.roles,
      tokenId: userToken.id,
    };

    const jwtToken = this.jwtService.sign(sessionPayload);
    session.user = sessionPayload;

    return {
      user,
      token: jwtToken,
    };
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw showError({
        statusCode: 400,
        statusMessage: 'Invalid signature',
        stack: undefined,
      });
    }
  }
}
