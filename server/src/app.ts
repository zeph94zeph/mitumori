import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import authRoutes from './routes/authRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import maintenanceRoutes from './routes/maintenanceRoutes';
import inspectionRoutes from './routes/inspectionRoutes';
import documentRoutes from './routes/documentRoutes';
import backupRoutes from './routes/backupRoutes';
import reportRoutes from './routes/reportRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/auth', authRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/maintenance-records', maintenanceRoutes);
app.use('/inspection-records', inspectionRoutes);
app.use('/documents', documentRoutes);
app.use('/backup', backupRoutes);
app.use('/reports', reportRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/users', userRoutes);

app.use('*', (_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);
