import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '../../reportWebVitals';
import LoginForm from './component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>
);

reportWebVitals();
