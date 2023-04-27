import { User } from './database/entities/user/user.entity';
import { H3Event as BaseEvent, H3EventContext as BaseContext } from 'h3';
import { Session as BaseSession } from '@sidebase/nuxt-session';

export interface FindTypes {
  one: 'one';
  many: 'many';
  both: 'both';
}
export type FindType = keyof FindTypes;

export interface InputFile {
  name: string;
  data: Buffer;
  mimeType: string;
  extension: string;
}

export interface AuthSessionPayload
  extends Pick<User, 'name' | 'email' | 'status' | 'tenantId'> {
  id: number;
  roles: string[];
  tokenId: number;
  tenantId: number;
  profilePath?: string | null;
}

export type Session = BaseSession & { user?: AuthSessionPayload };

export type EventContext = BaseContext & { session?: Session };
export class H3Event extends BaseEvent {
  context: EventContext;
}
