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
    firstName: z.string(),
    lastName: z.string().nullable(),
    roles: z.array(z.string()),
    tokenId: z.number(),
    tenantId: z.number(),
    profilePath: z.string().nullable(),
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
    const { data, token: accessToken } = await this.verifySmartSuiteToken(
      token,
    );

    const user = await this.userRepository.findOne({
      where: {
        userId: data?.id,
      },
      relations: {
        roles: true,
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
      name: [data.firstName, data.lastName].join(' '),
      email: data.email,
      roles: user.roles.map((role) => role.slug),
      tokenId: userToken.id,
      profilePath: data.profilePath,
    };

    const jwtToken = this.jwtService.sign(sessionPayload);
    session.user = sessionPayload;

    return {
      user,
      token: jwtToken,
    };
  }

  async logout(session: Session) {
    const token = await this.tokenRepository.findOneBy({
      id: session.user?.tokenId,
    });

    session.user = undefined;

    return {
      token: token!.accessToken,
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

  async verifySmartSuiteToken(token: string) {
    try {
      return await this.apiService.post({
        data: { token },
        schema: loggedInDataSchema,
        url: `/auth/sso/verify`,
      });
    } catch (error) {
      console.error('sso-verification-failed', error);
      return {
        data: null,
        token: null,
      };
    }
  }
}
