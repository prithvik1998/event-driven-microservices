export const registerCustomer = (data) =>
  fetch(`http://abc47a48b20d243089058aef34696659-1816326668.us-east-1.elb.amazonaws.com:8184/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());