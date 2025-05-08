import React from 'react';
import { Container, CssBaseline, Box, Typography, AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import Dashboard from './components/Dashboard';
import OrderTracking from './components/OrderTracking';

const ORDER_API_URL = process.env.REACT_APP_ORDER_API_URL || "http://your-public-order-api:8181";

function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Food Delivery
          </Typography>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="inherit" indicatorColor="secondary">
            <Tab label="Dashboard" />
            <Tab label="Track Order" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {tab === 0 && <Dashboard />}
        {tab === 1 && <OrderTracking />}
      </Container>
    </>
  );
}

export default App;