import React from 'react';
import * as ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { ContextProvider, store } from './context/Context';

const rootElement = document.getElementById('root');
if (rootElement === null) throw new Error('Root container missing in index.html');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <ContextProvider value={{ store }}>
    <App />
  </ContextProvider>
);
