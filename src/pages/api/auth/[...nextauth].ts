import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import nextAuth, { NextAuthOptions, User } from 'next-auth';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Endereço de email', type: 'text' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        const user = {
          id: 'abc',
          fullName: 'João Dematte',
          image: '123',
          email: 'demattejoao@gmail.com',
          emailVerified: new Date(),
          role: 'USER',
          password: '123'
        };

        if (credentials?.email === user.email && credentials.password === user.password) {
          return user;
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }

      return token;
    },
    session({ session, token }) {
      session.user = token.user as User;

      return session;
    }
  }
};

export default nextAuth(authOptions);
