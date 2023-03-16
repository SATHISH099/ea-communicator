import type { inferAsyncReturnType } from '@trpc/server';
import type { EventContext, H3Event } from '../types';

export const createContext = ({ context }: H3Event): EventContext => {
  return context;
};

export type Context = inferAsyncReturnType<typeof createContext>;
