export const registerCustomer = (data) =>
  fetch(`${process.env.REACT_APP_CUSTOMER_API_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());