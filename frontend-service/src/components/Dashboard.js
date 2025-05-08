import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Divider, Paper } from '@mui/material';
import RestaurantList from './RestaurantList';
import MenuSelection from './MenuSelection';
import { createOrder } from '../services/orderService';
import { registerCustomer } from '../services/customerService';

const Dashboard = () => {
  // Customer registration state
  const [customerDetails, setCustomerDetails] = useState({
    customerId: '',
    username: '',
    firstName: '',
    lastName: ''
  });
  const [customerConfirmed, setCustomerConfirmed] = useState(false);
  const [customerMessage, setCustomerMessage] = useState('');

  // Order state
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [address, setAddress] = useState({ street: '', postalCode: '', city: '' });
  const [message, setMessage] = useState('');
  const [orderTrackingId, setOrderTrackingId] = useState('');

  // Handle customer registration
  const handleConfirmCustomer = async () => {
    try {
      await registerCustomer(customerDetails);
      setCustomerConfirmed(true);
      setCustomerMessage('Customer confirmed!');
    } catch (error) {
      setCustomerMessage('Customer registration failed: ' + error.message);
    }
  };

  // Handle order placement
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
        customerId: customerDetails.customerId,
        restaurantId: selectedRestaurant.id,
        address,
        price,
        items
      });
      console.log('Order API response:', response);
      const trackingId = response?.orderTrackingId || response?.trackingId || (response?.data && response.data.orderTrackingId);
      if (trackingId) {
        setOrderTrackingId(trackingId);
        setMessage('Order placed successfully!');
      } else {
        setOrderTrackingId('');
        setMessage('Order placed, but no tracking ID was returned. See console for details.');
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
      {!customerConfirmed ? (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Enter Your Details</Typography>
          <TextField label="Customer ID" fullWidth sx={{ mb: 2 }} value={customerDetails.customerId} onChange={e => setCustomerDetails({ ...customerDetails, customerId: e.target.value })} />
          <TextField label="Username" fullWidth sx={{ mb: 2 }} value={customerDetails.username} onChange={e => setCustomerDetails({ ...customerDetails, username: e.target.value })} />
          <TextField label="First Name" fullWidth sx={{ mb: 2 }} value={customerDetails.firstName} onChange={e => setCustomerDetails({ ...customerDetails, firstName: e.target.value })} />
          <TextField label="Last Name" fullWidth sx={{ mb: 2 }} value={customerDetails.lastName} onChange={e => setCustomerDetails({ ...customerDetails, lastName: e.target.value })} />
          <Button variant="contained" onClick={handleConfirmCustomer}>Confirm Your Details</Button>
          {customerMessage && <Typography sx={{ mt: 2 }}>{customerMessage}</Typography>}
        </Paper>
      ) : !selectedRestaurant ? (
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