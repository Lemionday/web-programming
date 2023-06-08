import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from './components/layout/Protected';
import DashboardPage from './pages/Dashboard';
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
import CarsStatisticsPage from './pages/Cars/Statistics';
import CarInformationPage from './pages/Cars/Infomation';
import { Center } from './components/models/Center';

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
              return fetch(`${config.baseUrl}/centers`);
            }
          },
          {
            element: <ProtectedLayout />,
            children: [
              { path: '/dashboard', element: <DashboardPage /> },
              // { path: '/car_list', element: <CarList /> },
              {
                path: '/account/register',
                element: <RegisterPage />,
                loader: async function () {
                  return fetch(`${config.baseUrl}/center/getall`)
                }
              },
              { path: '/accounts', element: <AccountsPage /> },
              { path: '/account', element: <AccountsPage /> },
              { path: '/cars/statistics', element: <CarsStatisticsPage /> },
              { path: '/car/information/:id', element: <CarInformationPage /> }
            ]
          },
          // {
          //   path: '/test/pagination',
          //   element: <TestPage />
          // }
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}