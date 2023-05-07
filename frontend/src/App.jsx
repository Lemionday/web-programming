import { createBrowserRouter } from 'react-router-dom';
// import './App.css';
import { Layout } from './components/shared/Layout/AuthLayout';
import ProtectedLayout from './components/shared/Layout/ProtectedLayout';
import CarList from './pages/CarList/CarList';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/ErrorPage';
import { HomePage } from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import HomeLayout from './components/shared/Layout/HomeLayout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
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
          { path: '/car_list', element: <CarList /> }
        ]
      }
    ]
  }
]);