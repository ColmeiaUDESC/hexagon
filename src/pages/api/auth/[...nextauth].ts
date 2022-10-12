import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import nextAuth, { NextAuthOptions, User } from 'next-auth';
import bcrypt from 'bcryptjs';
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
        if (!credentials?.email || !credentials?.password) return null;

        const existsUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        });

        if (!existsUser) return null;

        if (!bcrypt.compareSync(credentials?.password, existsUser.password)) return null;

        const { password, ...userWithoutPassword } = existsUser;

        return userWithoutPassword;
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
