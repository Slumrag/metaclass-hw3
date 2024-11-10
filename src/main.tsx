import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RootStoreProvider } from 'store/RootStore';
import App from './App';
import './styles/styles.scss';
import './configs/store/configureMobx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </StrictMode>,
);
