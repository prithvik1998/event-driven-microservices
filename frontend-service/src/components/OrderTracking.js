import React, { useState } from 'react';
import { getOrder } from '../services/orderService';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleCheckStatus = async () => {
    // Hardcode the order status to 'APPROVED' for demo
    setOrderStatus({ orderStatus: 'APPROVED', message: 'Order has been approved (demo).' });
    setMessage('');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Order Tracking</Typography>
      <TextField label="Order Tracking ID" fullWidth value={trackingId} onChange={e => setTrackingId(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleCheckStatus}>Check Order Status</Button>
      {orderStatus && (
        <Box sx={{ mt: 2 }}>
          <Typography>Status: {orderStatus.orderStatus}</Typography>
          <Typography>Message: {orderStatus.message}</Typography>
        </Box>
      )}
      {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
    </Paper>
  );
};

export default OrderTracking; 