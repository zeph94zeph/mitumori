import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { vehicleApi, maintenanceApi } from '../api';

export const SearchPage: React.FC = () => {
  const { data: vehicles } = useQuery(['vehicles'], vehicleApi.list);
  const { data: maintenance } = useQuery(['maintenance-records'], () => maintenanceApi.list());
  const [vehicleFilters, setVehicleFilters] = useState({ keyword: '', status: '' });
  const [maintenanceFilters, setMaintenanceFilters] = useState({ keyword: '', vehicleId: '' });

  const filteredVehicles = useMemo(() => {
    const keyword = vehicleFilters.keyword.toLowerCase();
    return (vehicles?.data ?? []).filter((vehicle) => {
      const matchesKeyword = [vehicle.name, vehicle.registrationNumber, vehicle.owner, vehicle.model]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(keyword));
      const matchesStatus = vehicleFilters.status ? vehicle.status === vehicleFilters.status : true;
      return matchesKeyword && matchesStatus;
    });
  }, [vehicleFilters, vehicles]);

  const filteredMaintenance = useMemo(() => {
    const keyword = maintenanceFilters.keyword.toLowerCase();
    return (maintenance?.data ?? []).filter((record) => {
      const matchesKeyword = [record.serviceItem, record.serviceDescription, record.engineerId]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(keyword));
      const matchesVehicle = maintenanceFilters.vehicleId ? record.vehicleId === maintenanceFilters.vehicleId : true;
      return matchesKeyword && matchesVehicle;
    });
  }, [maintenance, maintenanceFilters]);

  const vehicleColumns = useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'model', headerName: 'Model', flex: 1 },
      { field: 'registrationNumber', headerName: 'Registration', flex: 1 },
      { field: 'status', headerName: 'Status', flex: 1 },
      { field: 'owner', headerName: 'Owner', flex: 1 }
    ],
    []
  );

  const maintenanceColumns = useMemo<GridColDef[]>(
    () => [
      { field: 'vehicleId', headerName: 'Vehicle', flex: 1 },
      { field: 'serviceItem', headerName: 'Item', flex: 1 },
      { field: 'serviceDescription', headerName: 'Description', flex: 1 },
      { field: 'engineerId', headerName: 'Engineer', flex: 1 },
      { field: 'serviceDate', headerName: 'Date', flex: 1 }
    ],
    []
  );

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Search</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Vehicle search</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2} mb={2}>
            <TextField
              label="Keyword"
              value={vehicleFilters.keyword}
              onChange={(event) => setVehicleFilters((prev) => ({ ...prev, keyword: event.target.value }))}
            />
            <TextField
              select
              label="Status"
              value={vehicleFilters.status}
              onChange={(event) => setVehicleFilters((prev) => ({ ...prev, status: event.target.value }))}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </TextField>
          </Stack>
          <Box sx={{ height: 400 }}>
            <DataGrid rows={filteredVehicles} columns={vehicleColumns} getRowId={(row) => row.id} />
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Maintenance search</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2} mb={2}>
            <TextField
              label="Keyword"
              value={maintenanceFilters.keyword}
              onChange={(event) => setMaintenanceFilters((prev) => ({ ...prev, keyword: event.target.value }))}
            />
            <TextField
              select
              label="Vehicle"
              value={maintenanceFilters.vehicleId}
              onChange={(event) => setMaintenanceFilters((prev) => ({ ...prev, vehicleId: event.target.value }))}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All</MenuItem>
              {(vehicles?.data ?? []).map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Box sx={{ height: 400 }}>
            <DataGrid rows={filteredMaintenance} columns={maintenanceColumns} getRowId={(row) => row.id} />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};
