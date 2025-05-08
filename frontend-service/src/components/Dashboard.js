import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const Dashboard = () => (
  <Box>
    <Box sx={{ backgroundColor: 'red', color: 'white', p: 2, mb: 2, borderRadius: 2, textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
      FRONTEND UPDATED SUCCESSFULLY!
    </Box>
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">Welcome to Food Delivery!</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Register as a customer, create orders, and track your food in real time.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: 'green' }}>
          This is a test message: The frontend was updated!
        </Typography>
      </CardContent>
    </Card>
    {/* You can add more dashboard widgets here */}
  </Box>
);

export default Dashboard;