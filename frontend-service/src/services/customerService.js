const API_BASE_URL = 'http://abc47a48b20d243089058aef34696659-1816326668.us-east-1.elb.amazonaws.com:8184';

export const registerCustomer = async (customerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering customer:', error);
    throw error;
  }
}; 