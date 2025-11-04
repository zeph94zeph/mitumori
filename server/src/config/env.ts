import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/vms',
  jwtSecret: process.env.JWT_SECRET ?? 'changeme',
  sendGridKey: process.env.SENDGRID_KEY ?? '',
  mailFrom: process.env.MAIL_FROM ?? 'no-reply@example.com'
};
