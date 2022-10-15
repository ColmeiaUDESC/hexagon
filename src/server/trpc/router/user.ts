import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { sendEmail } from '../../../utils/mailer';

const createUserSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
  registerToken: z.number().optional()
});

const deleteUserSchema = z.object({
  id: z.string()
});

const editUserSchema = z.object({
  id: z.string(),
  fullName: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(['ADMIN', 'USER']).optional()
});

const verifyEmail = z.object({
  email: z.string(),
  token: z.number()
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
    const { fullName, email, password, passwordConfirm, registerToken } = input;

    let isTokenValid = false;

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

    if (registerToken) {
      const existsCode = await ctx.prisma.registerToken.findUnique({
        where: {
          token_email: {
            token: registerToken,
            email
          }
        }
      });

      if (!existsCode) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Token de registro não é válido.'
        });
      }

      await ctx.prisma.registerToken.delete({
        where: {
          id: existsCode.id
        }
      });

      isTokenValid = true;
    } else {
      const token = Math.floor(100000 + Math.random() * 900000);

      await ctx.prisma.registerToken.create({
        data: {
          token,
          email
        }
      });

      await sendEmail({
        to: email,
        subject: 'Hexagon - Token de registro',
        html: `
          <p><b>Token de registro:</b> ${token}</p>
          <p><a target="_blank" href="http://localhost:3000/confirm-email?email=${email}&token=${token}">Ou se preferir, pode clicar aqui para ir ao link e preencher automaticamente.</a></p>
        `,
        text: `Token de registro: ${token}`
      });
    }

    const passwordHash = await bcrypt.hash(password, 8);

    await ctx.prisma.user.create({
      data: {
        fullName,
        email,
        password: passwordHash,
        role: isTokenValid ? 'ADMIN' : 'USER',
        emailVerified: isTokenValid ? new Date() : undefined
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
  }),
  edit: protectedProcedure.input(editUserSchema).mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== 'ADMIN') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Você não está autorizado para realizar essa operação.'
      });
    }

    await ctx.prisma.user.update({
      where: {
        id: input.id
      },
      data: {
        fullName: input.fullName,
        email: input.email,
        role: input.role
      }
    });

    return {
      status: 200,
      message: 'Usuário atualizado com sucesso.'
    };
  }),
  verifyEmail: publicProcedure.input(verifyEmail).mutation(async ({ ctx, input }) => {
    const { email, token } = input;

    const existsCode = await ctx.prisma.registerToken.findUnique({
      where: {
        token_email: {
          email,
          token
        }
      }
    });

    if (!existsCode) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Token de registro não é válido.'
      });
    }

    await ctx.prisma.user.update({
      where: {
        email
      },
      data: {
        emailVerified: new Date()
      }
    });

    await ctx.prisma.registerToken.delete({
      where: {
        id: existsCode.id
      }
    });

    return {
      status: 200,
      message: 'Endereço de email confirmado com sucesso.'
    };
  })
});
