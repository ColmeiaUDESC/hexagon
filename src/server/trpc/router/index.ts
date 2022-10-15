import { router } from '../trpc';
import { authRouter } from './auth';
import { registerTokenRouter } from './registerToken';
import { userRouter } from './user';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  registerToken: registerTokenRouter
});

export type AppRouter = typeof appRouter;
