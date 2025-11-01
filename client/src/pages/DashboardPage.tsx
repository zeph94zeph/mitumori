import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api';
import { Card, CardContent, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

export const DashboardPage: React.FC = () => {
  const { data } = useQuery(['dashboard-summary'], dashboardApi.summary);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Vehicles</Typography>
            <Typography variant="h4">{data?.vehicleCount ?? 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Active</Typography>
            <Typography variant="h4">{data?.activeCount ?? 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Maintenance</Typography>
            <Typography variant="h4">{data?.maintenanceCount ?? 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Inspection Overdue</Typography>
            <Typography variant="h4">{data?.inspectionOverdueCount ?? 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upcoming Maintenance
            </Typography>
            <List>
              {data?.upcomingMaintenance?.length ? (
                data.upcomingMaintenance.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={`${item.serviceItem} - ${new Date(item.serviceDate).toLocaleDateString()}`}
                      secondary={`Vehicle: ${item.vehicleId} / Cost: ${item.totalCost}`}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No upcoming maintenance" />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Maintenance
            </Typography>
            <List>
              {data?.recentMaintenance?.length ? (
                data.recentMaintenance.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={`${item.serviceItem} - ${new Date(item.serviceDate).toLocaleDateString()}`}
                      secondary={`Vehicle: ${item.vehicleId} / Cost: ${item.totalCost}`}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No recent maintenance" />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upcoming Inspections
            </Typography>
            <List>
              {data?.upcomingInspections?.length ? (
                data.upcomingInspections.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={`${item.item} - ${new Date(item.performedAt).toLocaleDateString()}`}
                      secondary={`Vehicle: ${item.vehicleId} / Status: ${item.status}`}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No upcoming inspections" />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
