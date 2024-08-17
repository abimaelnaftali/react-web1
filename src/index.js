import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes'
import { CartContextProvider } from './context/CartContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartContextProvider>
    <RouterProvider router={router}/>
  </CartContextProvider>
);

reportWebVitals();
