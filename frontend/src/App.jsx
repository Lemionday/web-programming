import { createBrowserRouter } from 'react-router-dom';
import './App.scss';
import { AuthLayout } from './components/shared/Layout/AuthLayout';
import ProtectedLayout from './components/shared/Layout/ProtectedLayout';
import CarList from './pages/CarList/CarList';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/ErrorPage';
import { HomePage } from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import HomeLayout from './components/shared/Layout/HomeLayout';
import RegisterPage from './pages/Register/Register';
import BaseLayout from './components/shared/Layout/BaseLayout';
import AccountsList from './pages/UserList/AccountsList';

export const router = createBrowserRouter([
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
            element: <ProtectedLayout />,
            children: [
              { path: '/dashboard', element: <Dashboard /> },
              { path: '/car_list', element: <CarList /> },
              { path: '/register', element: <RegisterPage /> },
              { path: '/accounts', element: <AccountsList /> }
            ]
          }
        ]
      }
    ]
  }
]);