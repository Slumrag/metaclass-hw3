import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/styles.scss';
import './configs/store/configureMobx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
