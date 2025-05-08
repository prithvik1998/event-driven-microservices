import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Divider, Paper } from '@mui/material';
import RestaurantList from './RestaurantList';
import MenuSelection from './MenuSelection';
import { createOrder } from '../services/orderService';
import { registerCustomer } from '../services/customerService';

const Dashboard = () => {
  // Customer registration state
  const HARDCODED_CUSTOMER_ID = "d215b5f8-0249-4dc5-89a3-51fd148cfb41";
  const [customerDetails, setCustomerDetails] = useState({
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

  // Hardcoded order details
  const HARDCODED_ORDER = {
    customerId: "d215b5f8-0249-4dc5-89a3-51fd148cfb41",
    restaurantId: "d215b5f8-0249-4dc5-89a3-51fd148cfb45",
    items: [
      {
        productId: "d215b5f8-0249-4dc5-89a3-51fd148cfb48",
        quantity: 1,
        price: 50.00,
        subTotal: 50.00
      },
      {
        productId: "d215b5f8-0249-4dc5-89a3-51fd148cfb48",
        quantity: 3,
        price: 50.00,
        subTotal: 150.00
      }
    ],
    price: 200.00
  };

  // Handle customer registration
  const handleConfirmCustomer = async () => {
    try {
      await registerCustomer({
        customerId: HARDCODED_CUSTOMER_ID,
        username: customerDetails.username,
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName
      });
      setCustomerConfirmed(true);
      setCustomerMessage('Customer confirmed!');
    } catch (error) {
      setCustomerMessage('Customer registration failed: ' + error.message);
    }
  };

  // Handle order placement
  const handlePlaceOrder = async () => {
    try {
      const response = await createOrder({
        customerId: HARDCODED_ORDER.customerId,
        restaurantId: HARDCODED_ORDER.restaurantId,
        address,
        price: HARDCODED_ORDER.price,
        items: HARDCODED_ORDER.items
      });
      console.log('Order API response:', response);
      const trackingId = response && response.orderTrackingId;
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