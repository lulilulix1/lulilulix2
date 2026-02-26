import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@aws-amplify/ui-react/styles.css';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <ShoppingCartProvider>
    <App />
  </ShoppingCartProvider>
);
