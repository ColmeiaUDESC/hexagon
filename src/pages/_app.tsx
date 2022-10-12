import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { trpc } from '../utils/trpc';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </SessionProvider>
);

export default trpc.withTRPC(MyApp);
