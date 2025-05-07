const API_BASE_URL = 'http://a666dd10fea464039b8cfacf6c27bb38-1881340992.us-east-1.elb.amazonaws.com:8181';

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Order creation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrder = async (orderTrackingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderTrackingId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}; 