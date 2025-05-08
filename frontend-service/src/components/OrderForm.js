import React, { useState } from 'react';
import { createOrder } from '../services/orderService';
import { TextField, Button, Box, Typography, Paper, Divider } from '@mui/material';
import RestaurantList from './RestaurantList';
import MenuSelection from './MenuSelection';

const OrderForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [address, setAddress] = useState({ street: '', postalCode: '', city: '' });
  const [message, setMessage] = useState('');
  const [trackingId, setTrackingId] = useState('');

  const handleOrder = async (e) => {
    e.preventDefault();
    const items = selectedItems
      .filter(item => item.quantity > 0)
      .map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        subTotal: item.price * item.quantity
      }));
    const price = items.reduce((sum, item) => sum + item.subTotal, 0);
    try {
      const response = await createOrder({
        customerId,
        restaurantId: selectedRestaurant.id,
        address,
        price,
        items
      });
      setTrackingId(response.orderTrackingId);
      setMessage('Order created successfully!');
    } catch (error) {
      setMessage('Order creation failed: ' + error.message);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Create Order</Typography>
      {!customerId ? (
        <Box sx={{ mb: 2 }}>
          <TextField label="Customer ID" fullWidth required value={customerId} onChange={e => setCustomerId(e.target.value)} />
        </Box>
      ) : !selectedRestaurant ? (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Select a Restaurant</Typography>
          <RestaurantList onSelect={setSelectedRestaurant} />
        </>
      ) : (
        <form onSubmit={handleOrder}>
          <Typography variant="subtitle1">Selected Restaurant: {selectedRestaurant.name}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1">Delivery Address</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField label="Street" required value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
            <TextField label="Postal Code" required value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} />
            <TextField label="City" required value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
          </Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Select Menu Items</Typography>
          <MenuSelection menu={selectedRestaurant.menu} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>Place Order</Button>
        </form>
      )}
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
      {trackingId && <Typography sx={{ mt: 2 }}>Order Tracking ID: {trackingId}</Typography>}
    </Paper>
  );
};

export default OrderForm; 