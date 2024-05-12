import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/Register';
import PrivateRoute from './Routes/PrivateRoute';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import Calendar from "./pages/Calendar";
import { Provider } from "react-redux";
import Sample from "./sample";
import store from "./redux/store/store";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },

  {
    path: "/dashboard",
    element:
      <PrivateRoute><Sample /></PrivateRoute>,
    // <RegisterPage/>,
    children: [
      {
        path: "/dashboard/profile", // Relative path to the parent route "/dashboard/*"
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: "/dashboard/calendar", // Relative path to the parent route "/dashboard/*"
        element: <PrivateRoute><Calendar /></PrivateRoute>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);
