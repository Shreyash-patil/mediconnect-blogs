import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the app inside StrictMode for additional development checks
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);