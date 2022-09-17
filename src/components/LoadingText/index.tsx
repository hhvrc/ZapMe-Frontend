import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '../../reportWebVitals';
import LoadingText from './component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LoadingText />
  </React.StrictMode>
);

reportWebVitals();
