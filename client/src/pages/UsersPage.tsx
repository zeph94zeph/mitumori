import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { userApi } from '../api';

export const UsersPage: React.FC = () => {
  const { data } = useQuery(['users'], userApi.list);

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'role', headerName: 'Role', flex: 1 }
    ],
    []
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          User management
        </Typography>
        <Box sx={{ height: 500 }}>
          <DataGrid rows={data ?? []} columns={columns} getRowId={(row) => row.id} />
        </Box>
      </CardContent>
    </Card>
  );
};
