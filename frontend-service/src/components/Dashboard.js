import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const Dashboard = () => (
  <Box>
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">Welcome to Food Delivery!</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Register as a customer, create orders, and track your food in real time.
        </Typography>
      </CardContent>
    </Card>
    {/* You can add more dashboard widgets here */}
  </Box>
);

export default Dashboard;