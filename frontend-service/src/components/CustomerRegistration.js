import React, { useState } from 'react';
import { registerCustomer } from '../services/customerService';

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    username: '',
    firstName: '',
    lastName: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerCustomer(formData);
      alert('Customer registered successfully!');
      console.log('Customer registered:', response);
    } catch (error) {
      alert('Registration failed: ' + error.message);
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="registration-form">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            value={formData.customerId}
            onChange={(e) => setFormData({...formData, customerId: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomerRegistration; 