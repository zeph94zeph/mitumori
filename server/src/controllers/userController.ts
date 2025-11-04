import type { Response } from 'express';
import { prisma } from '../config/prisma';
import type { AuthRequest } from '../middleware/auth';

export const me = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, role: true }
  });
  res.json(user);
};

export const listUsers = async (_req: AuthRequest, res: Response) => {
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
  res.json(users);
};
