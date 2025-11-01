import jwt from 'jsonwebtoken';
import type { Role } from '@prisma/client';
import { env } from '../config/env';

export const createToken = (id: string, role: Role) =>
  jwt.sign({ id, role }, env.jwtSecret, { expiresIn: '12h' });
