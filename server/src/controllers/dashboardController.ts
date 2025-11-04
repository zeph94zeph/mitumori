import type { Request, Response } from 'express';
import { addDays } from 'date-fns';
import { prisma } from '../config/prisma';

export const dashboardSummary = async (_req: Request, res: Response) => {
  const now = new Date();
  const [vehicles, maintenance, inspections] = await Promise.all([
    prisma.vehicle.findMany(),
    prisma.maintenanceRecord.findMany({
      orderBy: { serviceDate: 'desc' },
      take: 5
    }),
    prisma.inspectionRecord.findMany({
      where: { performedAt: { gte: now } },
      orderBy: { performedAt: 'asc' },
      take: 5
    })
  ]);

  const overdueInspections = await prisma.inspectionRecord.count({
    where: { performedAt: { lt: now } }
  });
  const upcomingMaintenance = await prisma.maintenanceRecord.findMany({
    where: { serviceDate: { gte: now, lte: addDays(now, 30) } },
    orderBy: { serviceDate: 'asc' },
    take: 5
  });

  res.json({
    vehicleCount: vehicles.length,
    activeCount: vehicles.filter((vehicle) => vehicle.status === 'ACTIVE').length,
    maintenanceCount: vehicles.filter((vehicle) => vehicle.status === 'MAINTENANCE').length,
    inspectionOverdueCount: overdueInspections,
    upcomingInspections: inspections,
    upcomingMaintenance,
    recentMaintenance: maintenance
  });
};
