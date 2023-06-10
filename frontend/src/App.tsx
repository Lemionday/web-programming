import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from './components/layout/Protected';
import DashboardPage from './pages/Dashboard';
import { HomePage } from './pages/Home';
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
import CarsStatisticsPage, { DataProvider } from './pages/Cars/Statistics/RegisteredCars';
import CarInformationPage from './pages/Cars/CarInfomation';
import CarsListPage from './pages/Cars/AllCarsList';
import OwnerProfile from './pages/Cars/Owner/OwnerProfile';
import InvalidatedCarsStatisticsPage from './pages/Cars/Statistics/InvalidatedCars';

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
              return fetch(`${config.baseUrl}/center/getall`);
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
              {
                path: '/car',
                children: [
                  { path: 'statistics/registered', element: <CarsStatisticsPage /> },
                  { path: 'statistics/invalidated', element: <InvalidatedCarsStatisticsPage /> },
                  { path: 'information/:plate', element: <CarInformationPage />, },
                  { path: 'listall', element: <CarsListPage /> }
                ]
              },
              {
                path: '/owner/:ownerId',
                element: <OwnerProfile />
              }
            ]
          },
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}