import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { Auth } from './pages';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>
);
