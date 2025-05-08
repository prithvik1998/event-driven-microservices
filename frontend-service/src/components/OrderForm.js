import React, { useState } from 'react';
import { createOrder } from '../services/orderService';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';

const defaultItem = { productId: '', quantity: 1, price: 0, subTotal: 0 };

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    customerId: '',
    restaurantId: '',
    address: { street: '', postalCode: '', city: '' },
    price: 0,
    items: [ { ...defaultItem } ]
  });
  const [trackingId, setTrackingId] = useState('');
  const [message, setMessage] = useState('');

  const handleItemChange = (idx, field, value) => {
    const items = [...orderData.items];
    items[idx][field] = field === 'quantity' || field === 'price' || field === 'subTotal' ? parseFloat(value) : value;
    setOrderData({ ...orderData, items });
  };

  const addItem = () => setOrderData({ ...orderData, items: [ ...orderData.items, { ...defaultItem } ] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrder(orderData);
      setTrackingId(response.orderTrackingId);
      setMessage('Order created successfully!');
    } catch (error) {
      setMessage('Order creation failed: ' + error.message);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Create Order</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Customer ID" fullWidth required value={orderData.customerId} onChange={e => setOrderData({ ...orderData, customerId: e.target.value })} /></Grid>
          <Grid item xs={6}><TextField label="Restaurant ID" fullWidth required value={orderData.restaurantId} onChange={e => setOrderData({ ...orderData, restaurantId: e.target.value })} /></Grid>
          <Grid item xs={4}><TextField label="Street" fullWidth required value={orderData.address.street} onChange={e => setOrderData({ ...orderData, address: { ...orderData.address, street: e.target.value } })} /></Grid>
          <Grid item xs={4}><TextField label="Postal Code" fullWidth required value={orderData.address.postalCode} onChange={e => setOrderData({ ...orderData, address: { ...orderData.address, postalCode: e.target.value } })} /></Grid>
          <Grid item xs={4}><TextField label="City" fullWidth required value={orderData.address.city} onChange={e => setOrderData({ ...orderData, address: { ...orderData.address, city: e.target.value } })} /></Grid>
          <Grid item xs={12}><TextField label="Total Price" fullWidth required type="number" value={orderData.price} onChange={e => setOrderData({ ...orderData, price: parseFloat(e.target.value) })} /></Grid>
        </Grid>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Items</Typography>
        {orderData.items.map((item, idx) => (
          <Grid container spacing={2} key={idx} sx={{ mb: 1 }}>
            <Grid item xs={3}><TextField label="Product ID" fullWidth required value={item.productId} onChange={e => handleItemChange(idx, 'productId', e.target.value)} /></Grid>
            <Grid item xs={3}><TextField label="Quantity" fullWidth required type="number" value={item.quantity} onChange={e => handleItemChange(idx, 'quantity', e.target.value)} /></Grid>
            <Grid item xs={3}><TextField label="Price" fullWidth required type="number" value={item.price} onChange={e => handleItemChange(idx, 'price', e.target.value)} /></Grid>
            <Grid item xs={3}><TextField label="SubTotal" fullWidth required type="number" value={item.subTotal} onChange={e => handleItemChange(idx, 'subTotal', e.target.value)} /></Grid>
          </Grid>
        ))}
        <Button onClick={addItem} sx={{ mb: 2 }}>Add Item</Button>
        <Box>
          <Button type="submit" variant="contained">Create Order</Button>
        </Box>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
      {trackingId && <Typography sx={{ mt: 2 }}>Order Tracking ID: {trackingId}</Typography>}
    </Paper>
  );
};

export default OrderForm; 