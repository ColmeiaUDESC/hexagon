import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { router, publicProcedure, protectedProcedure } from '../trpc';

const createUserSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
  registerCode: z.number().optional()
});

const deleteUserSchema = z.object({
  id: z.string()
});

export const userRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        email: true,
        fullName: true,
        id: true,
        role: true,
        image: true,
        emailVerified: true
      }
    });

    return {
      status: 200,
      message: 'Usuários obtidos com sucesso',
      users
    };
  }),
  create: publicProcedure.input(createUserSchema).mutation(async ({ ctx, input }) => {
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
  }),
  delete: protectedProcedure.input(deleteUserSchema).mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== 'ADMIN') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Você não está autorizado para realizar essa operação.'
      });
    }

    await ctx.prisma.user.delete({
      where: {
        id: input.id
      }
    });

    return {
      status: 200,
      message: 'Usuário deletado com sucesso.'
    };
  })
});
