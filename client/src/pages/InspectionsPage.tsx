import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { inspectionApi, vehicleApi } from '../api';
import { useMemo, useState } from 'react';
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

const schema = yup.object({
  vehicleId: yup.string().required(),
  item: yup.string().required(),
  description: yup.string().required(),
  status: yup.mixed<'PENDING' | 'IN_PROGRESS' | 'COMPLETED'>().oneOf(['PENDING', 'IN_PROGRESS', 'COMPLETED']).required(),
  progress: yup.number().min(0).max(100).required(),
  performedAt: yup.string().required(),
  inspectorId: yup.string().required()
});

type InspectionForm = yup.InferType<typeof schema>;

export const InspectionsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: inspections } = useQuery(['inspection-records'], () => inspectionApi.list());
  const { data: vehicles } = useQuery(['vehicle-options'], vehicleApi.list);
  const [open, setOpen] = useState(false);
  const defaultValues: InspectionForm = {
    vehicleId: '',
    item: '',
    description: '',
    status: 'PENDING',
    progress: 0,
    performedAt: new Date().toISOString().slice(0, 10),
    inspectorId: ''
  };
  const createMutation = useMutation(inspectionApi.create, {
    onSuccess: () => queryClient.invalidateQueries(['inspection-records'])
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InspectionForm>({ resolver: yupResolver(schema), defaultValues });

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'vehicleId', headerName: 'Vehicle', flex: 1 },
      { field: 'item', headerName: 'Item', flex: 1 },
      { field: 'description', headerName: 'Description', flex: 1 },
      { field: 'status', headerName: 'Status', flex: 1 },
      { field: 'progress', headerName: 'Progress', type: 'number', flex: 1 },
      { field: 'performedAt', headerName: 'Date', flex: 1 },
      { field: 'inspectorId', headerName: 'Inspector', flex: 1 }
    ],
    []
  );

  const onSubmit = (payload: InspectionForm) => {
    createMutation.mutate(payload);
    setOpen(false);
    reset(defaultValues);
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Inspection Management</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            reset(defaultValues);
          }}
        >
          Add inspection
        </Button>
      </Stack>
      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={inspections?.data ?? []}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          reset(defaultValues);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Register inspection</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              select
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
            <TextField
              label="Inspection item"
              error={!!errors.item}
              helperText={errors.item?.message}
              {...register('item')}
            />
            <TextField
              label="Description"
              multiline
              minRows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description')}
            />
            <TextField
              select
              label="Status"
              error={!!errors.status}
              helperText={errors.status?.message}
              {...register('status')}
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="IN_PROGRESS">In progress</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </TextField>
            <TextField
              label="Progress"
              type="number"
              inputProps={{ min: 0, max: 100 }}
              error={!!errors.progress}
              helperText={errors.progress?.message}
              {...register('progress', { valueAsNumber: true })}
            />
            <TextField
              label="Performed at"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.performedAt}
              helperText={errors.performedAt?.message}
              {...register('performedAt')}
            />
            <TextField
              label="Inspector"
              error={!!errors.inspectorId}
              helperText={errors.inspectorId?.message}
              {...register('inspectorId')}
            />
          </Stack>
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
