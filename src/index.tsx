import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const client = new QueryClient();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
