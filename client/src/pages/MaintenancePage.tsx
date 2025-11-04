import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { maintenanceApi, vehicleApi } from '../api';

const schema = yup.object({
  vehicleId: yup.string().required(),
  serviceDate: yup.string().required(),
  serviceItem: yup.string().required(),
  serviceDescription: yup.string().required(),
  engineerId: yup.string().required(),
  manHours: yup.number().min(0).required(),
  laborCost: yup.number().min(0).required(),
  partsCost: yup.number().min(0).required(),
  totalCost: yup.number().min(0).required(),
  notes: yup.string().optional(),
  parts: yup
    .array(
      yup.object({
        partName: yup.string().required(),
        unitPrice: yup.number().min(0).required(),
        quantity: yup.number().min(1).required()
      })
    )
    .default([])
});

type MaintenanceForm = yup.InferType<typeof schema>;

export const MaintenancePage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery(['maintenance-records'], () => maintenanceApi.list());
  const { data: vehicles } = useQuery(['vehicle-options'], vehicleApi.list);
  const [open, setOpen] = useState(false);
  const defaultValues: MaintenanceForm = {
    vehicleId: '',
    serviceDate: new Date().toISOString().slice(0, 10),
    serviceItem: '',
    serviceDescription: '',
    engineerId: '',
    manHours: 0,
    laborCost: 0,
    partsCost: 0,
    totalCost: 0,
    notes: '',
    parts: []
  };
  const createMutation = useMutation(maintenanceApi.create, {
    onSuccess: () => queryClient.invalidateQueries(['maintenance-records'])
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MaintenanceForm>({ resolver: yupResolver(schema), defaultValues });

  const { fields, append, remove } = useFieldArray({ control, name: 'parts' });

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'vehicleId', headerName: 'Vehicle', flex: 1 },
      { field: 'serviceDate', headerName: 'Service date', flex: 1 },
      { field: 'serviceItem', headerName: 'Item', flex: 1 },
      { field: 'serviceDescription', headerName: 'Description', flex: 1 },
      { field: 'totalCost', headerName: 'Total cost', type: 'number', flex: 1 }
    ],
    []
  );

  const onSubmit = (payload: MaintenanceForm) => {
    createMutation.mutate(payload);
    setOpen(false);
    reset(defaultValues);
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Maintenance Management</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            reset(defaultValues);
          }}
        >
          Add maintenance
        </Button>
      </Stack>
      <Box sx={{ height: 500 }}>
        <DataGrid rows={data?.data ?? []} columns={columns} disableRowSelectionOnClick getRowId={(row) => row.id} />
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          reset(defaultValues);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Register maintenance</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Vehicle"
                error={!!errors.vehicleId}
                helperText={errors.vehicleId?.message}
                {...register('vehicleId')}
              >
                {(vehicles?.data ?? []).map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                label="Service date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.serviceDate}
                helperText={errors.serviceDate?.message}
                {...register('serviceDate')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Service item"
                fullWidth
                error={!!errors.serviceItem}
                helperText={errors.serviceItem?.message}
                {...register('serviceItem')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Engineer"
                fullWidth
                error={!!errors.engineerId}
                helperText={errors.engineerId?.message}
                {...register('engineerId')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Service description"
                fullWidth
                multiline
                minRows={3}
                error={!!errors.serviceDescription}
                helperText={errors.serviceDescription?.message}
                {...register('serviceDescription')}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Man hours"
                type="number"
                fullWidth
                error={!!errors.manHours}
                helperText={errors.manHours?.message}
                {...register('manHours', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Labor cost"
                type="number"
                fullWidth
                error={!!errors.laborCost}
                helperText={errors.laborCost?.message}
                {...register('laborCost', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Parts cost"
                type="number"
                fullWidth
                error={!!errors.partsCost}
                helperText={errors.partsCost?.message}
                {...register('partsCost', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Total cost"
                type="number"
                fullWidth
                error={!!errors.totalCost}
                helperText={errors.totalCost?.message}
                {...register('totalCost', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                minRows={2}
                error={!!errors.notes}
                helperText={errors.notes?.message}
                {...register('notes')}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Parts used</Typography>
                <IconButton
                  color="primary"
                  onClick={() => append({ partName: '', unitPrice: 0, quantity: 1 })}
                >
                  <AddIcon />
                </IconButton>
              </Stack>
              <List>
                {fields.map((field, index) => (
                  <ListItem
                    key={field.id}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => remove(index)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} width="100%">
                      <TextField
                        label="Part name"
                        fullWidth
                        error={!!errors.parts?.[index]?.partName}
                        helperText={errors.parts?.[index]?.partName?.message}
                        {...register(`parts.${index}.partName` as const)}
                      />
                      <TextField
                        label="Unit price"
                        type="number"
                        fullWidth
                        error={!!errors.parts?.[index]?.unitPrice}
                        helperText={errors.parts?.[index]?.unitPrice?.message}
                        {...register(`parts.${index}.unitPrice` as const, { valueAsNumber: true })}
                      />
                      <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        error={!!errors.parts?.[index]?.quantity}
                        helperText={errors.parts?.[index]?.quantity?.message}
                        {...register(`parts.${index}.quantity` as const, { valueAsNumber: true })}
                      />
                    </Stack>
                  </ListItem>
                ))}
                {fields.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No parts added" />
                  </ListItem>
                )}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              reset(defaultValues);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
