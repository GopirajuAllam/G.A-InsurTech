import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error during render:', error);
  document.body.innerHTML = `
    <div style="color: red; padding: 20px;">
      <h1>Failed to render application</h1>
      <pre style="background: #f5f5f5; padding: 10px; margin-top: 10px;">
        ${error instanceof Error ? error.message : 'Unknown error'}
      </pre>
    </div>
  `;
}
