export const createOrder = (data) =>
  fetch(`http://a666dd10fea464039b8cfacf6c27bb38-1881340992.us-east-1.elb.amazonaws.com:8181/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getOrder = (trackingId) =>
  fetch(`http://a666dd10fea464039b8cfacf6c27bb38-1881340992.us-east-1.elb.amazonaws.com:8181/orders/${trackingId}`)
    .then(res => res.json());