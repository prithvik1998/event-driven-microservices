import React, { useState } from 'react';
import { createOrder, getOrder } from '../services/orderService';

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    customerId: '',
    restaurantId: '',
    address: {
      street: '',
      postalCode: '',
      city: ''
    },
    price: 0,
    items: [
      {
        productId: '',
        quantity: 1,
        price: 0,
        subTotal: 0
      },
      {
        productId: '',
        quantity: 1,
        price: 0,
        subTotal: 0
      }
    ]
  });

  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const handleItemChange = (index, field, value) => {
    const newItems = [...orderData.items];
    newItems[index][field] = field === 'quantity' || field === 'price' || field === 'subTotal' ? parseFloat(value) : value;
    setOrderData({ ...orderData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format price and subTotal fields to two decimal places
    const formattedOrderData = {
      ...orderData,
      price: Number(orderData.price).toFixed(2),
      items: orderData.items.map(item => ({
        ...item,
        price: Number(item.price).toFixed(2),
        subTotal: Number(item.subTotal).toFixed(2),
      }))
    };

    try {
      const response = await createOrder(formattedOrderData);
      alert('Order created successfully! Order ID: ' + response.orderTrackingId);
      console.log('Order created:', response);
      setTrackingId(response.orderTrackingId);
    } catch (error) {
      alert('Order creation failed: ' + error.message);
      console.error('Order creation failed:', error);
    }
  };

  const handleCheckStatus = async () => {
    try {
      const statusResponse = await getOrder(trackingId);
      setOrderStatus(statusResponse);
    } catch (error) {
      alert('Failed to fetch order status: ' + error.message);
    }
  };

  return (
    <div className="order-form">
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            value={orderData.customerId}
            onChange={(e) => setOrderData({...orderData, customerId: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Restaurant ID:</label>
          <input
            type="text"
            value={orderData.restaurantId}
            onChange={(e) => setOrderData({...orderData, restaurantId: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Street:</label>
          <input
            type="text"
            value={orderData.address.street}
            onChange={(e) => setOrderData({
              ...orderData,
              address: {...orderData.address, street: e.target.value}
            })}
            required
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            value={orderData.address.postalCode}
            onChange={(e) => setOrderData({
              ...orderData,
              address: {...orderData.address, postalCode: e.target.value}
            })}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={orderData.address.city}
            onChange={(e) => setOrderData({
              ...orderData,
              address: {...orderData.address, city: e.target.value}
            })}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={orderData.price}
            onChange={(e) => setOrderData({...orderData, price: parseFloat(e.target.value)})}
            required
          />
        </div>
        <h3>Items</h3>
        {orderData.items.map((item, idx) => (
          <div key={idx} style={{border: '1px solid #ccc', marginBottom: '10px', padding: '10px'}}>
            <div>
              <label>Product ID:</label>
              <input
                type="text"
                value={item.productId}
                onChange={e => handleItemChange(idx, 'productId', e.target.value)}
                required
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                value={item.quantity}
                onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                value={item.price}
                onChange={e => handleItemChange(idx, 'price', e.target.value)}
                required
              />
            </div>
            <div>
              <label>SubTotal:</label>
              <input
                type="number"
                value={item.subTotal}
                onChange={e => handleItemChange(idx, 'subTotal', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button type="submit">Create Order</button>
      </form>
      {trackingId && (
        <div>
          <h3>Order Tracking</h3>
          <p>Order Tracking ID: {trackingId}</p>
          <button onClick={handleCheckStatus}>Check Order Status</button>
          {orderStatus && (
            <div>
              <p>Status: {orderStatus.orderStatus}</p>
              <p>Message: {orderStatus.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderForm; 