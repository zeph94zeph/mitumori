import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';

const partSchema = z.object({
  partName: z.string().min(1),
  unitPrice: z.number().nonnegative(),
  quantity: z.number().int().positive()
});

const maintenanceSchema = z.object({
  vehicleId: z.string().uuid(),
  serviceDate: z.string().refine((value) => !Number.isNaN(Date.parse(value))),
  serviceItem: z.string().min(1),
  serviceDescription: z.string().min(1),
  engineerId: z.string().min(1),
  manHours: z.number().nonnegative(),
  laborCost: z.number().nonnegative(),
  partsCost: z.number().nonnegative(),
  totalCost: z.number().nonnegative(),
  notes: z.string().optional(),
  parts: z.array(partSchema).default([])
});

export const listMaintenance = async (req: Request, res: Response) => {
  const { vehicleId, from, to } = req.query;
  const where: Record<string, unknown> = {};
  if (vehicleId) {
    where.vehicleId = vehicleId;
  }
  if (from || to) {
    where.serviceDate = {
      gte: from ? new Date(String(from)) : undefined,
      lte: to ? new Date(String(to)) : undefined
    };
  }
  const records = await prisma.maintenanceRecord.findMany({
    where,
    include: { parts: true },
    orderBy: { serviceDate: 'desc' }
  });
  res.json({ data: records, total: records.length });
};

export const createMaintenance = async (req: Request, res: Response) => {
  const payload = maintenanceSchema.parse(req.body);
  const record = await prisma.maintenanceRecord.create({
    data: {
      vehicleId: payload.vehicleId,
      serviceDate: new Date(payload.serviceDate),
      serviceItem: payload.serviceItem,
      serviceDescription: payload.serviceDescription,
      engineerId: payload.engineerId,
      manHours: payload.manHours,
      laborCost: payload.laborCost,
      partsCost: payload.partsCost,
      totalCost: payload.totalCost,
      notes: payload.notes,
      parts: {
        create: payload.parts.map((part) => ({
          partName: part.partName,
          unitPrice: part.unitPrice,
          quantity: part.quantity
        }))
      }
    },
    include: { parts: true }
  });
  res.status(201).json(record);
};
