import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

const createTokenSchema = z.object({
  email: z.string()
});

export const registerTokenRouter = router({
  create: protectedProcedure.input(createTokenSchema).mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== 'ADMIN') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Você não está autorizado para realizar essa operação.'
      });
    }

    const { email } = input;

    const existsTokenForEmail = await ctx.prisma.registerToken.findFirst({
      where: {
        email
      }
    });

    if (existsTokenForEmail) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Já existe um token para esse email.'
      });
    }

    const token = Math.floor(100000 + Math.random() * 900000);

    const createdToken = await ctx.prisma.registerToken.create({
      data: {
        email,
        token
      }
    });

    return {
      status: 200,
      message: 'Token criado com sucesso',
      token: createdToken
    };
  })
});
