import React, { useState } from 'react';
import { registerCustomer } from '../services/customerService';
import { TextField, Button, Paper, Typography, Grid } from '@mui/material';

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    username: '',
    firstName: '',
    lastName: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerCustomer(formData);
      setMessage('Customer registered successfully!');
    } catch (error) {
      setMessage('Registration failed: ' + error.message);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Customer Registration</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Customer ID" fullWidth required value={formData.customerId} onChange={e => setFormData({ ...formData, customerId: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Username" fullWidth required value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="First Name" fullWidth required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Last Name" fullWidth required value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Register</Button>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Paper>
  );
};

export default CustomerRegistration; 