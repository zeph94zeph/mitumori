import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Card, CardContent, Grid, Stack, TextField, Typography, MenuItem, Button } from '@mui/material';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell } from 'recharts';
import { reportApi, vehicleApi } from '../api';

const COLORS = ['#1976d2', '#9c27b0', '#ff9800', '#4caf50', '#f44336'];

export const ReportsPage: React.FC = () => {
  const { data: vehicleList } = useQuery(['vehicles'], vehicleApi.list);
  const [filters, setFilters] = useState({ from: '', to: '', vehicleId: '' });
  const { data: maintenanceReport, refetch } = useQuery(['reports-maintenance', filters], () =>
    reportApi.maintenance(filters)
  );
  const { data: vehicleReport } = useQuery(['reports-vehicles', filters], () => reportApi.vehicles(filters));

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Reports</Typography>
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <TextField
              type="date"
              label="From"
              InputLabelProps={{ shrink: true }}
              value={filters.from}
              onChange={(event) => setFilters((prev) => ({ ...prev, from: event.target.value }))}
            />
            <TextField
              type="date"
              label="To"
              InputLabelProps={{ shrink: true }}
              value={filters.to}
              onChange={(event) => setFilters((prev) => ({ ...prev, to: event.target.value }))}
            />
            <TextField
              select
              label="Vehicle"
              value={filters.vehicleId}
              onChange={(event) => setFilters((prev) => ({ ...prev, vehicleId: event.target.value }))}
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="">All vehicles</MenuItem>
              {vehicleList?.data.map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={() => refetch()}>
              Apply
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 360 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Maintenance Cost
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={maintenanceReport?.monthlyCosts ?? []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalCost" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 360 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cost Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={maintenanceReport?.costBreakdown ?? []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#9c27b0" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 360 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vehicle Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={vehicleReport?.statusDistribution ?? []}
                    dataKey="count"
                    nameKey="status"
                    outerRadius={120}
                    label
                  >
                    {(vehicleReport?.statusDistribution ?? []).map((entry, index) => (
                      <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 360 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Maintenance Cost by Vehicle
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={maintenanceReport?.vehicleTotals ?? []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vehicle" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalCost" fill="#ff9800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};
