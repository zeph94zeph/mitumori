import type { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const maintenanceReport = async (req: Request, res: Response) => {
  const { from, to, vehicleId } = req.query;
  const where: Record<string, unknown> = {};
  if (vehicleId) where.vehicleId = vehicleId;
  if (from || to) {
    where.serviceDate = {
      gte: from ? new Date(String(from)) : undefined,
      lte: to ? new Date(String(to)) : undefined
    };
  }
  const [records, vehicles] = await Promise.all([
    prisma.maintenanceRecord.findMany({ where }),
    prisma.vehicle.findMany({ select: { id: true, name: true } })
  ]);

  const monthlyCosts = records.reduce<Record<string, number>>((acc, record) => {
    const key = `${record.serviceDate.getFullYear()}-${record.serviceDate.getMonth() + 1}`;
    acc[key] = (acc[key] ?? 0) + record.totalCost;
    return acc;
  }, {});

  const vehicleTotals = records.reduce<Record<string, number>>((acc, record) => {
    acc[record.vehicleId] = (acc[record.vehicleId] ?? 0) + record.totalCost;
    return acc;
  }, {});

  res.json({
    monthlyCosts: Object.entries(monthlyCosts).map(([month, totalCost]) => ({ month, totalCost })),
    costBreakdown: [
      { category: 'Labor', amount: records.reduce((sum, record) => sum + record.laborCost, 0) },
      { category: 'Parts', amount: records.reduce((sum, record) => sum + record.partsCost, 0) }
    ],
    vehicleTotals: Object.entries(vehicleTotals).map(([vehicleId, totalCost]) => ({
      vehicle: vehicles.find((vehicle) => vehicle.id === vehicleId)?.name ?? vehicleId,
      totalCost
    }))
  });
};

export const vehicleReport = async (_req: Request, res: Response) => {
  const vehicles = await prisma.vehicle.findMany();
  const statusDistribution = vehicles.reduce<Record<string, number>>((acc, vehicle) => {
    acc[vehicle.status] = (acc[vehicle.status] ?? 0) + 1;
    return acc;
  }, {});

  res.json({
    statusDistribution: Object.entries(statusDistribution).map(([status, count]) => ({ status, count }))
  });
};
