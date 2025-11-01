import httpClient from './httpClient';
import type {
  AuthResponse,
  DashboardSummary,
  Document,
  InspectionRecord,
  MaintenanceRecord,
  ReportFilters,
  User,
  Vehicle
} from '../types/api';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

export const authApi = {
  login: (email: string, password: string) =>
    httpClient.post<AuthResponse>('/auth/login', { email, password }).then((res) => res.data),
  register: (payload: { name: string; email: string; password: string }) =>
    httpClient.post<AuthResponse>('/auth/register', payload).then((res) => res.data)
};

export const vehicleApi = {
  list: () => httpClient.get<PaginatedResponse<Vehicle>>('/vehicles').then((res) => res.data),
  create: (vehicle: Partial<Vehicle>) => httpClient.post<Vehicle>('/vehicles', vehicle).then((res) => res.data),
  update: (id: string, vehicle: Partial<Vehicle>) =>
    httpClient.put<Vehicle>(`/vehicles/${id}`, vehicle).then((res) => res.data),
  remove: (id: string) => httpClient.delete(`/vehicles/${id}`)
};

export const maintenanceApi = {
  list: (params?: Record<string, string | number | undefined>) =>
    httpClient
      .get<PaginatedResponse<MaintenanceRecord>>('/maintenance-records', { params })
      .then((res) => res.data),
  create: (record: Partial<MaintenanceRecord>) =>
    httpClient.post<MaintenanceRecord>('/maintenance-records', record).then((res) => res.data)
};

export const inspectionApi = {
  list: (params?: Record<string, string | number | undefined>) =>
    httpClient
      .get<PaginatedResponse<InspectionRecord>>('/inspection-records', { params })
      .then((res) => res.data),
  create: (record: Partial<InspectionRecord>) =>
    httpClient.post<InspectionRecord>('/inspection-records', record).then((res) => res.data)
};

export const documentApi = {
  list: (params?: Record<string, string | number | undefined>) =>
    httpClient.get<PaginatedResponse<Document>>('/documents', { params }).then((res) => res.data),
  create: (document: Partial<Document>) =>
    httpClient.post<Document>('/documents', document).then((res) => res.data),
  downloadPdf: (id: string) => httpClient.get(`/documents/${id}/pdf`, { responseType: 'blob' })
};

export const dashboardApi = {
  summary: () => httpClient.get<DashboardSummary>('/dashboard/summary').then((res) => res.data)
};

export const reportApi = {
  maintenance: (filters: ReportFilters) =>
    httpClient.get('/reports/maintenance', { params: filters }).then((res) => res.data),
  vehicles: (filters: ReportFilters) =>
    httpClient.get('/reports/vehicles', { params: filters }).then((res) => res.data)
};

export const userApi = {
  me: () => httpClient.get<User>('/users/me').then((res) => res.data),
  list: () => httpClient.get<User[]>('/users').then((res) => res.data)
};
