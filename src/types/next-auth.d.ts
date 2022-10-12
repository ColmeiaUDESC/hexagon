// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      fullName: string;
      email: string;
      emailVerified: Date;
      image: string;
      role: 'USER' | 'ADMIN';
    };
    expires: ISODateString;
  }

  interface User {
    id: string;
    fullName: string;
    email: string;
    emailVerified: Date;
    image: string;
    role: 'USER' | 'ADMIN';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      fullName: string;
      email: string;
      emailVerified: Date;
      image: string;
      role: 'USER' | 'ADMIN';
    };
    sub?: string;
  }
}
