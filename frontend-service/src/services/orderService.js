export const createOrder = (data) =>
  fetch(`${process.env.REACT_APP_ORDER_API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getOrder = (trackingId) =>
  fetch(`${process.env.REACT_APP_ORDER_API_URL}/orders/${trackingId}`)
    .then(res => res.json());