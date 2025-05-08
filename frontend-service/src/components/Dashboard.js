import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, Divider, Paper } from '@mui/material';
import RestaurantList from './RestaurantList';
import MenuSelection from './MenuSelection';
import { createOrder } from '../services/orderService';

const DEFAULT_CUSTOMER_ID = "d215b5f8-0249-4dc5-89a3-51fd148cfb41";

const Dashboard = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [address, setAddress] = useState({ street: '', postalCode: '', city: '' });
  const [message, setMessage] = useState('');
  const [orderTrackingId, setOrderTrackingId] = useState('');

  const handlePlaceOrder = async () => {
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
        customerId: DEFAULT_CUSTOMER_ID,
        restaurantId: selectedRestaurant.id,
        address,
        price,
        items
      });
      console.log('Order API response:', response);
      if (response && response.orderTrackingId) {
        setOrderTrackingId(response.orderTrackingId);
        setMessage('Order placed successfully!');
      } else {
        setOrderTrackingId('');
        setMessage('Order placed, but no tracking ID was returned.');
      }
    } catch (error) {
      setMessage('Order failed: ' + error.message);
    }
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: 'red', color: 'white', p: 2, mb: 2, borderRadius: 2, textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
        FOOD ORDERING SYSTEM DEMO
      </Box>
      {!selectedRestaurant ? (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>Select a Restaurant</Typography>
          <RestaurantList onSelect={setSelectedRestaurant} />
        </>
      ) : (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">{selectedRestaurant.name} - Menu</Typography>
          <MenuSelection menu={selectedRestaurant.menu} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1">Delivery Address</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField label="Street" required value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
            <TextField label="Postal Code" required value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} />
            <TextField label="City" required value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
          </Box>
          <Button variant="contained" onClick={handlePlaceOrder}>Place Order</Button>
          {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
          {orderTrackingId && (
            <Box sx={{ mt: 2 }}>
              <Typography color="primary">Order Tracking ID: <b>{orderTrackingId}</b></Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Copy this tracking ID and use it in the Track Order tab to check your order status.
              </Typography>
            </Box>
          )}
          <Button sx={{ mt: 2 }} onClick={() => { setSelectedRestaurant(null); setSelectedItems([]); setMessage(''); setOrderTrackingId(''); }}>
            Back to Restaurants
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard;