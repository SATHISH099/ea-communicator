import { router } from '../trpc';
import { app } from './app.router';
import { auth } from './auth.router';
import { dashboard } from './dashboard.router';
import { email } from './email.router';
import { sms } from './sms.router';
import { message } from './message.router';
import { voice } from './voice.router';
import { media } from './media.router';
import { profile } from './profile.router';
import { library } from './library.router';

export const appRouter = router({
  app,
  profile,
  auth,
  dashboard,
  email,
  sms,
  media,
  message,
  voice,
  library,
});

export type AppRouter = typeof appRouter;
