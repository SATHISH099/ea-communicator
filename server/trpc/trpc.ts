import { initTRPC } from '@trpc/server';
import type { Context } from '~/server/trpc/context';

const t = initTRPC.context<Context>().create();

export const procedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;
