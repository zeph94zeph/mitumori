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
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { documentApi } from '../api';

const lineSchema = yup.object({
  itemName: yup.string().required(),
  description: yup.string().required(),
  quantity: yup.number().min(1).required(),
  unitPrice: yup.number().min(0).required()
});

const schema = yup.object({
  type: yup.mixed<'QUOTATION' | 'DELIVERY' | 'INVOICE' | 'RECEIPT'>().required(),
  issueDate: yup.string().required(),
  dueDate: yup.string().required(),
  customerId: yup.string().required(),
  issuerId: yup.string().required(),
  taxRate: yup.number().min(0).max(100).required(),
  remarks: yup.string().optional(),
  lines: yup.array(lineSchema).min(1).required()
});

type DocumentForm = yup.InferType<typeof schema>;

export const DocumentsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery(['documents'], () => documentApi.list());
  const [open, setOpen] = useState(false);
  const createMutation = useMutation(documentApi.create, {
    onSuccess: () => queryClient.invalidateQueries(['documents'])
  });
  const defaultValues: DocumentForm = {
    type: 'INVOICE',
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10),
    customerId: '',
    issuerId: '',
    taxRate: 10,
    remarks: '',
    lines: []
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<DocumentForm>({ resolver: yupResolver(schema), defaultValues });

  const { fields, append, remove } = useFieldArray({ control, name: 'lines' });

  const totals = watch('lines')?.reduce(
    (acc, line) => {
      const amount = (line?.quantity ?? 0) * (line?.unitPrice ?? 0);
      acc.subtotal += amount;
      return acc;
    },
    { subtotal: 0 }
  ) ?? { subtotal: 0 };

  const taxRate = watch('taxRate') ?? 0;
  const tax = totals.subtotal * (taxRate / 100);
  const total = totals.subtotal + tax;

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'type', headerName: 'Type', flex: 1 },
      { field: 'issueDate', headerName: 'Issue date', flex: 1 },
      { field: 'dueDate', headerName: 'Due date', flex: 1 },
      { field: 'customerId', headerName: 'Customer', flex: 1 },
      { field: 'total', headerName: 'Total', flex: 1 }
    ],
    []
  );

  const onSubmit = (payload: DocumentForm) => {
    const linesWithAmount = payload.lines.map((line) => ({
      ...line,
      amount: line.quantity * line.unitPrice
    }));
    createMutation.mutate({ ...payload, lines: linesWithAmount, subtotal: totals.subtotal, tax, total });
    setOpen(false);
    reset({
      type: 'INVOICE',
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date().toISOString().slice(0, 10),
      customerId: '',
      issuerId: '',
      taxRate: 10,
      remarks: '',
      lines: []
    });
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Document Management</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            reset(defaultValues);
          }}
        >
          Create document
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
        <DialogTitle>Create document</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Type"
                fullWidth
                error={!!errors.type}
                helperText={errors.type?.message}
                {...register('type')}
              >
                <MenuItem value="QUOTATION">Quotation</MenuItem>
                <MenuItem value="DELIVERY">Delivery</MenuItem>
                <MenuItem value="INVOICE">Invoice</MenuItem>
                <MenuItem value="RECEIPT">Receipt</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                type="date"
                label="Issue date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.issueDate}
                helperText={errors.issueDate?.message}
                {...register('issueDate')}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                type="date"
                label="Due date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.dueDate}
                helperText={errors.dueDate?.message}
                {...register('dueDate')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer"
                fullWidth
                error={!!errors.customerId}
                helperText={errors.customerId?.message}
                {...register('customerId')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Issuer"
                fullWidth
                error={!!errors.issuerId}
                helperText={errors.issuerId?.message}
                {...register('issuerId')}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Tax rate (%)"
                type="number"
                fullWidth
                error={!!errors.taxRate}
                helperText={errors.taxRate?.message}
                {...register('taxRate', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                multiline
                minRows={2}
                fullWidth
                error={!!errors.remarks}
                helperText={errors.remarks?.message}
                {...register('remarks')}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Line items
              </Typography>
              <Stack spacing={2}>
                {fields.map((field, index) => (
                  <Stack key={field.id} direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      label="Item name"
                      fullWidth
                      error={!!errors.lines?.[index]?.itemName}
                      helperText={errors.lines?.[index]?.itemName?.message}
                      {...register(`lines.${index}.itemName` as const)}
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      error={!!errors.lines?.[index]?.description}
                      helperText={errors.lines?.[index]?.description?.message}
                      {...register(`lines.${index}.description` as const)}
                    />
                    <TextField
                      label="Quantity"
                      type="number"
                      fullWidth
                      error={!!errors.lines?.[index]?.quantity}
                      helperText={errors.lines?.[index]?.quantity?.message}
                      {...register(`lines.${index}.quantity` as const, { valueAsNumber: true })}
                    />
                    <TextField
                      label="Unit price"
                      type="number"
                      fullWidth
                      error={!!errors.lines?.[index]?.unitPrice}
                      helperText={errors.lines?.[index]?.unitPrice?.message}
                      {...register(`lines.${index}.unitPrice` as const, { valueAsNumber: true })}
                    />
                    <Button color="error" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </Stack>
                ))}
                <Button onClick={() => append({ itemName: '', description: '', quantity: 1, unitPrice: 0 })}>
                  Add line
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Subtotal: {totals.subtotal.toFixed(2)}</Typography>
              <Typography variant="body1">Tax: {tax.toFixed(2)}</Typography>
              <Typography variant="h6">Total: {total.toFixed(2)}</Typography>
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
