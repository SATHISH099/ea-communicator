import type { H3Event } from 'h3';
import type { inferAsyncReturnType } from '@trpc/server';

export const createContext = ({ context }: H3Event) => {
  return context;
};

export type Context = inferAsyncReturnType<typeof createContext>;
