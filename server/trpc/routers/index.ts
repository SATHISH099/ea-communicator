import { router } from '../trpc';
import { app } from './app.router';
import { auth } from './auth.router';
import { dashboard } from './dashboard.router';

export const appRouter = router({
  app,
  auth,
  dashboard,
});

export type AppRouter = typeof appRouter;
