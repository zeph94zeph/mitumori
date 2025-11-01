export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  model: string;
  registrationNumber: string;
  manufacturer: string;
  owner: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE';
  inspectionDueDate: string;
  mileage: number;
  fuelType: string;
  vin: string;
  purchaseDate: string;
  insuranceInfo: string;
  notes?: string;
}

export interface MaintenancePart {
  id: string;
  partName: string;
  unitPrice: number;
  quantity: number;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  serviceDate: string;
  serviceItem: string;
  serviceDescription: string;
  engineerId: string;
  manHours: number;
  laborCost: number;
  partsCost: number;
  totalCost: number;
  notes?: string;
  parts: MaintenancePart[];
}

export interface InspectionRecord {
  id: string;
  vehicleId: string;
  item: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  performedAt: string;
  updatedAt: string;
  inspectorId: string;
}

export interface DocumentLine {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Document {
  id: string;
  type: 'QUOTATION' | 'DELIVERY' | 'INVOICE' | 'RECEIPT';
  issueDate: string;
  dueDate: string;
  customerId: string;
  issuerId: string;
  remarks?: string;
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  lines: DocumentLine[];
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId?: string;
}

export interface DashboardSummary {
  vehicleCount: number;
  activeCount: number;
  maintenanceCount: number;
  inspectionOverdueCount: number;
  upcomingInspections: InspectionRecord[];
  upcomingMaintenance: MaintenanceRecord[];
  recentMaintenance: MaintenanceRecord[];
}

export interface ReportFilters {
  from?: string;
  to?: string;
  vehicleId?: string;
}
