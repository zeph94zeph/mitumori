import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';

const inspectionSchema = z.object({
  vehicleId: z.string().uuid(),
  item: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  progress: z.number().int().min(0).max(100),
  performedAt: z.string().refine((value) => !Number.isNaN(Date.parse(value))),
  inspectorId: z.string().min(1)
});

export const listInspections = async (req: Request, res: Response) => {
  const records = await prisma.inspectionRecord.findMany({
    where: {
      vehicleId: req.query.vehicleId ? String(req.query.vehicleId) : undefined,
      status: req.query.status ? String(req.query.status) : undefined
    },
    orderBy: { performedAt: 'desc' }
  });
  res.json({ data: records, total: records.length });
};

export const createInspection = async (req: Request, res: Response) => {
  const payload = inspectionSchema.parse(req.body);
  const record = await prisma.inspectionRecord.create({
    data: {
      vehicleId: payload.vehicleId,
      item: payload.item,
      description: payload.description,
      status: payload.status,
      progress: payload.progress,
      performedAt: new Date(payload.performedAt),
      inspectorId: payload.inspectorId
    }
  });
  res.status(201).json(record);
};
