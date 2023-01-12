import axios from 'axios';
import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { initialize } from 'react-ga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import App from './App';
initialize('UA-74092126-2');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    },
  },
});
const PROXY_URL = window.location.hostname === 'localhost' ? '' : '/proxy';

axios.defaults.baseURL = PROXY_URL;
axios.defaults.withCredentials = true;
const container = document.getElementById('root');

if (document.getElementById('root').hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
          <ReactQueryDevtools />
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
          <ReactQueryDevtools />
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
