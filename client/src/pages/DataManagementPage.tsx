import { useState } from 'react';
import { Button, Card, CardContent, Stack, TextField, Typography, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { vehicleApi, maintenanceApi, inspectionApi, documentApi } from '../api';

export const DataManagementPage: React.FC = () => {
  const { data: vehicles } = useQuery(['vehicles'], vehicleApi.list);
  const { data: maintenance } = useQuery(['maintenance-records'], () => maintenanceApi.list());
  const { data: inspections } = useQuery(['inspection-records'], () => inspectionApi.list());
  const { data: documents } = useQuery(['documents'], () => documentApi.list());
  const [backupJson, setBackupJson] = useState('');
  const [message, setMessage] = useState('');

  const handleExport = () => {
    const payload = {
      vehicles: vehicles?.data ?? [],
      maintenance: maintenance?.data ?? [],
      inspections: inspections?.data ?? [],
      documents: documents?.data ?? []
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setMessage('Backup exported successfully');
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(backupJson);
      setMessage(`Imported ${Object.keys(data).length} datasets (simulation)`);
    } catch (error) {
      setMessage('Failed to parse JSON');
    }
  };

  const handleDelete = () => {
    setMessage('All data deletion requested (simulation)');
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Data management</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Statistics</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle1">Vehicles</Typography>
                <Typography variant="h4">{vehicles?.total ?? 0}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle1">Maintenance</Typography>
                <Typography variant="h4">{maintenance?.total ?? 0}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle1">Inspections</Typography>
                <Typography variant="h4">{inspections?.total ?? 0}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle1">Documents</Typography>
                <Typography variant="h4">{documents?.total ?? 0}</Typography>
              </CardContent>
            </Card>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Backup & Restore</Typography>
          <Stack spacing={2} mt={2}>
            <Button variant="contained" onClick={handleExport}>
              Export backup (JSON)
            </Button>
            <TextField
              label="Import JSON"
              multiline
              minRows={4}
              value={backupJson}
              onChange={(event) => setBackupJson(event.target.value)}
            />
            <Button variant="outlined" onClick={handleImport}>
              Import backup
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Danger zone</Typography>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete all data
          </Button>
        </CardContent>
      </Card>
      {message && <Alert severity="info">{message}</Alert>}
    </Stack>
  );
};
