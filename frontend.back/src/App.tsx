import React from 'react';
// import './scss/App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from './components/layout/Protected';
import DashboardPage from './pages/Dashboard/Dashboard';
import { HomePage } from './pages/Home/Home';
import ErrorPage from './pages/Error';
import { AuthLayout } from './components/layout/Auth';
import HomeLayout from './components/layout/Home';
import RegisterPage from './pages/Signup';
import LoginPage from './pages/Login';
import AccountsPage from './pages/Accounts';
import { BaseLayout } from './components/layout/Base';
import CentersListPage from './pages/Centers';
import { config } from './conf/config';
import AboutPage from './pages/About';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />
          },
          {
            element: <HomeLayout />,
            children: [
              { path: '/login', element: <LoginPage /> }
            ]
          },
          {
            path: '/about',
            element: <AboutPage />
          },
          {
            path: '/centers',
            element: <CentersListPage />,
            loader: async function () {
              const res = await fetch(`${config.baseUrl}/centers`);
              return res.json();
            }
          },
          {
            element: <ProtectedLayout />,
            children: [
              { path: '/dashboard', element: <DashboardPage /> },
              // { path: '/car_list', element: <CarList /> },
              { path: '/register', element: <RegisterPage /> },
              { path: '/accounts', element: <AccountsPage /> },
              { path: '/account', element: <AccountsPage /> }
            ]
          }
        ]

      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}