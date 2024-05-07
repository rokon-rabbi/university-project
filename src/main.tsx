import React from 'react';


import * as ReactDOM from "react-dom/client";
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/Loginpage';

export const router = createBrowserRouter([
  {
    path: "*",
    element: <LoginPage/>
   
  },
  {
    path: "/dashboard/*",
    element: <App/>
   
  },

]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
