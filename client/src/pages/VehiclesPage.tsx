import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { vehicleApi } from '../api';
import type { Vehicle } from '../types/api';

const schema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  model: yup.string().required(),
  registrationNumber: yup.string().required(),
  manufacturer: yup.string().required(),
  owner: yup.string().required(),
  status: yup.mixed<'ACTIVE' | 'MAINTENANCE' | 'INACTIVE'>().oneOf(['ACTIVE', 'MAINTENANCE', 'INACTIVE']).required(),
  inspectionDueDate: yup.string().required(),
  mileage: yup.number().min(0).required(),
  fuelType: yup.string().required(),
  vin: yup.string().required(),
  purchaseDate: yup.string().required(),
  insuranceInfo: yup.string().required(),
  notes: yup.string().optional()
});

type VehicleForm = yup.InferType<typeof schema>;

export const VehiclesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery(['vehicles'], vehicleApi.list);
  const createMutation = useMutation(vehicleApi.create, {
    onSuccess: () => queryClient.invalidateQueries(['vehicles'])
  });
  const updateMutation = useMutation(({ id, payload }: { id: string; payload: Partial<Vehicle> }) => vehicleApi.update(id, payload), {
    onSuccess: () => queryClient.invalidateQueries(['vehicles'])
  });
  const deleteMutation = useMutation(vehicleApi.remove, {
    onSuccess: () => queryClient.invalidateQueries(['vehicles'])
  });
  const [open, setOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const defaultValues: VehicleForm = {
    name: '',
    type: '',
    model: '',
    registrationNumber: '',
    manufacturer: '',
    owner: '',
    status: 'ACTIVE',
    inspectionDueDate: '',
    mileage: 0,
    fuelType: '',
    vin: '',
    purchaseDate: '',
    insuranceInfo: '',
    notes: ''
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<VehicleForm>({ resolver: yupResolver(schema), defaultValues });

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'type', headerName: 'Type', flex: 1 },
      { field: 'model', headerName: 'Model', flex: 1 },
      { field: 'registrationNumber', headerName: 'Reg. No', flex: 1 },
      { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
      { field: 'owner', headerName: 'Owner', flex: 1 },
      { field: 'status', headerName: 'Status', flex: 1 },
      { field: 'inspectionDueDate', headerName: 'Inspection Due', flex: 1 },
      { field: 'mileage', headerName: 'Mileage', flex: 1, type: 'number' },
      { field: 'fuelType', headerName: 'Fuel', flex: 1 },
      { field: 'vin', headerName: 'VIN', flex: 1.2 },
      { field: 'purchaseDate', headerName: 'Purchase Date', flex: 1 },
      { field: 'insuranceInfo', headerName: 'Insurance', flex: 1 },
      { field: 'notes', headerName: 'Notes', flex: 1 },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              onClick={() => {
                setEditingVehicle(params.row as Vehicle);
                const vehicle = params.row as Vehicle;
                reset({
                  name: vehicle.name,
                  type: vehicle.type,
                  model: vehicle.model,
                  registrationNumber: vehicle.registrationNumber,
                  manufacturer: vehicle.manufacturer,
                  owner: vehicle.owner,
                  status: vehicle.status,
                  inspectionDueDate: vehicle.inspectionDueDate,
                  mileage: vehicle.mileage,
                  fuelType: vehicle.fuelType,
                  vin: vehicle.vin,
                  purchaseDate: vehicle.purchaseDate,
                  insuranceInfo: vehicle.insuranceInfo,
                  notes: vehicle.notes ?? ''
                });
                setOpen(true);
              }}
            >
              Edit
            </Button>
            <Button size="small" color="error" onClick={() => deleteMutation.mutate(params.row.id)}>
              Delete
            </Button>
          </Stack>
        )
      }
    ],
    [deleteMutation, reset]
  );

  const onSubmit = (payload: VehicleForm) => {
    if (editingVehicle) {
      updateMutation.mutate({ id: editingVehicle.id, payload });
    } else {
      createMutation.mutate(payload);
    }
    setOpen(false);
    setEditingVehicle(null);
    reset();
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Vehicle Management</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            setEditingVehicle(null);
            reset(defaultValues);
          }}
        >
          Add vehicle
        </Button>
      </Stack>
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={data?.data ?? []}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingVehicle(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{editingVehicle ? 'Edit vehicle' : 'Register vehicle'}</DialogTitle>
        <DialogContent>
          <Stack component="form" id="vehicle-form" spacing={2} mt={1}>
            <TextField
              label="Vehicle name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name')}
            />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Type"
                fullWidth
                error={!!errors.type}
                helperText={errors.type?.message}
                {...register('type')}
              />
              <TextField
                label="Model"
                fullWidth
                error={!!errors.model}
                helperText={errors.model?.message}
                {...register('model')}
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Registration number"
                fullWidth
                error={!!errors.registrationNumber}
                helperText={errors.registrationNumber?.message}
                {...register('registrationNumber')}
              />
              <TextField
                label="Manufacturer"
                fullWidth
                error={!!errors.manufacturer}
                helperText={errors.manufacturer?.message}
                {...register('manufacturer')}
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Owner"
                fullWidth
                error={!!errors.owner}
                helperText={errors.owner?.message}
                {...register('owner')}
              />
              <TextField
                select
                label="Status"
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
                {...register('status')}
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </TextField>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Inspection due date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.inspectionDueDate}
                helperText={errors.inspectionDueDate?.message}
                {...register('inspectionDueDate')}
              />
              <TextField
                label="Mileage"
                type="number"
                fullWidth
                error={!!errors.mileage}
                helperText={errors.mileage?.message}
                {...register('mileage', { valueAsNumber: true })}
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Fuel type"
                fullWidth
                error={!!errors.fuelType}
                helperText={errors.fuelType?.message}
                {...register('fuelType')}
              />
              <TextField
                label="VIN"
                fullWidth
                error={!!errors.vin}
                helperText={errors.vin?.message}
                {...register('vin')}
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Purchase date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.purchaseDate}
                helperText={errors.purchaseDate?.message}
                {...register('purchaseDate')}
              />
              <TextField
                label="Insurance info"
                fullWidth
                error={!!errors.insuranceInfo}
                helperText={errors.insuranceInfo?.message}
                {...register('insuranceInfo')}
              />
            </Stack>
            <TextField
              label="Notes"
              multiline
              minRows={3}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              {...register('notes')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setEditingVehicle(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {editingVehicle ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
