import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { prisma } from '../config/prisma';
import { env } from '../config/env';

const transporter = nodemailer.createTransport({
  jsonTransport: true
});

export const startSchedulers = () => {
  cron.schedule('0 8 * * *', async () => {
    const upcoming = await prisma.vehicle.findMany({
      where: {
        inspectionDueDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        }
      }
    });

    if (upcoming.length > 0) {
      await transporter.sendMail({
        from: env.mailFrom,
        to: env.mailFrom,
        subject: 'Upcoming inspections',
        text: upcoming
          .map((vehicle) => `${vehicle.name}: ${format(vehicle.inspectionDueDate, 'yyyy-MM-dd')}`)
          .join('\n')
      });
    }
  });
};
