import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';

const vehicleSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  model: z.string().min(1),
  registrationNumber: z.string().min(1),
  manufacturer: z.string().min(1),
  owner: z.string().min(1),
  status: z.string().min(1),
  inspectionDueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value))),
  mileage: z.number().int().nonnegative(),
  fuelType: z.string().min(1),
  vin: z.string().min(1),
  purchaseDate: z.string().refine((value) => !Number.isNaN(Date.parse(value))),
  insuranceInfo: z.string().min(1),
  notes: z.string().optional()
});

export const listVehicles = async (_req: Request, res: Response) => {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ data: vehicles, total: vehicles.length });
};

export const createVehicle = async (req: Request, res: Response) => {
  const payload = vehicleSchema.parse(req.body);
  const vehicle = await prisma.vehicle.create({
    data: {
      ...payload,
      inspectionDueDate: new Date(payload.inspectionDueDate),
      purchaseDate: new Date(payload.purchaseDate)
    }
  });
  res.status(201).json(vehicle);
};

export const updateVehicle = async (req: Request, res: Response) => {
  const payload = vehicleSchema.partial().parse(req.body);
  const vehicle = await prisma.vehicle.update({
    where: { id: req.params.id },
    data: {
      ...payload,
      inspectionDueDate: payload.inspectionDueDate
        ? new Date(payload.inspectionDueDate)
        : undefined,
      purchaseDate: payload.purchaseDate ? new Date(payload.purchaseDate) : undefined
    }
  });
  res.json(vehicle);
};

export const deleteVehicle = async (req: Request, res: Response) => {
  await prisma.vehicle.delete({ where: { id: req.params.id } });
  res.status(204).send();
};
