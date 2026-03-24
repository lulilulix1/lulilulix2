import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-config';
import '@aws-amplify/ui-react/styles.css';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

// ⚠️ KY RRESHT ËSHTË KRITIK! Konfiguro Amplify para se të nisë aplikacioni
Amplify.configure(awsconfig);

const root = createRoot(document.getElementById('root'));

root.render(
  <ShoppingCartProvider>
    <App />
  </ShoppingCartProvider>
);