import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { prisma } from '@/database/prisma';
import { compare } from 'bcrypt';
import { z } from 'zod';
import { authConfig } from '@/configs/auth';
import { sign } from 'jsonwebtoken';

class SessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Invalid email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role ?? 'member' }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    const { password: hashedPassword, ...userWithoutPassword } = user

    return res.json({token, user: userWithoutPassword});
  }
}

export { SessionsController };
