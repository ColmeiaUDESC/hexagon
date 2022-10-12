import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { router, publicProcedure } from '../trpc';

const createUser = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
  registerCode: z.number().optional()
});

export const userRouter = router({
  create: publicProcedure.input(createUser).mutation(async ({ ctx, input }) => {
    const { fullName, email, password, passwordConfirm } = input;

    if (password !== passwordConfirm) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'As senhas não conferem.'
      });
    }

    const existsUser = await ctx.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existsUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Endereço de email já registrado.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 8);

    await ctx.prisma.user.create({
      data: {
        fullName,
        email,
        password: passwordHash
      }
    });

    return {
      status: 201,
      message: 'Usuário registrado com sucesso!'
    };
  })
});
