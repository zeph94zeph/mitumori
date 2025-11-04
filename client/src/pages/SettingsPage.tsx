import { useState } from 'react';
import { Alert, Button, Card, CardContent, Stack, Switch, TextField, Typography, FormControlLabel } from '@mui/material';

interface SettingsForm {
  companyName: string;
  companyAddress: string;
  taxRate: number;
  notificationEmail: string;
  pushEnabled: boolean;
}

export const SettingsPage: React.FC = () => {
  const [form, setForm] = useState<SettingsForm>({
    companyName: 'Sample Motors',
    companyAddress: 'Tokyo, Japan',
    taxRate: 10,
    notificationEmail: 'info@example.com',
    pushEnabled: false
  });
  const [message, setMessage] = useState('');

  const handleChange = <K extends keyof SettingsForm>(field: K, value: SettingsForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setMessage('Settings saved (simulation)');
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Settings</Typography>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Company name"
              value={form.companyName}
              onChange={(event) => handleChange('companyName', event.target.value)}
            />
            <TextField
              label="Company address"
              multiline
              minRows={2}
              value={form.companyAddress}
              onChange={(event) => handleChange('companyAddress', event.target.value)}
            />
            <TextField
              label="Consumption tax rate (%)"
              type="number"
              value={form.taxRate}
              onChange={(event) => handleChange('taxRate', Number(event.target.value))}
            />
            <TextField
              label="Notification email"
              value={form.notificationEmail}
              onChange={(event) => handleChange('notificationEmail', event.target.value)}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.pushEnabled}
                  onChange={(event) => handleChange('pushEnabled', event.target.checked)}
                />
              }
              label="Enable push notifications"
            />
            <Button variant="contained" onClick={handleSubmit}>
              Save settings
            </Button>
            {message && <Alert severity="success">{message}</Alert>}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
