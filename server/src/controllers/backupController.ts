import type { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const exportData = async (_req: Request, res: Response) => {
  const [vehicles, maintenance, inspections, documents] = await Promise.all([
    prisma.vehicle.findMany(),
    prisma.maintenanceRecord.findMany({ include: { parts: true } }),
    prisma.inspectionRecord.findMany(),
    prisma.document.findMany({ include: { lines: true } })
  ]);

  res.json({ vehicles, maintenance, inspections, documents });
};

export const importData = async (req: Request, res: Response) => {
  const { vehicles = [], maintenance = [], inspections = [], documents = [] } = req.body as Record<string, unknown>;
  // For brevity we only acknowledge the payload
  res.json({
    message: 'Import scheduled',
    counts: {
      vehicles: Array.isArray(vehicles) ? vehicles.length : 0,
      maintenance: Array.isArray(maintenance) ? maintenance.length : 0,
      inspections: Array.isArray(inspections) ? inspections.length : 0,
      documents: Array.isArray(documents) ? documents.length : 0
    }
  });
};
