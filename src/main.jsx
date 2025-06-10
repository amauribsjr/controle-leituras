import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalStyles } from './styles/GlobalStyles';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering the app:', error);
}
