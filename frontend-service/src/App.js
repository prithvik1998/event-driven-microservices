import React from 'react';
import CustomerRegistration from './components/CustomerRegistration';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Food Ordering System</h1>
      </header>
      <main>
        <CustomerRegistration />
        <OrderForm />
      </main>
    </div>
  );
}

export default App; 