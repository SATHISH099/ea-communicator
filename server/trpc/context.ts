import type { inferAsyncReturnType } from '@trpc/server';
import type { H3Event } from '../types';

export const createContext = ({ context }: H3Event) => {
  return context;
};

export type Context = inferAsyncReturnType<typeof createContext>;
