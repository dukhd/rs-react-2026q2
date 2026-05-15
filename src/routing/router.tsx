import { createBrowserRouter } from 'react-router';

import Layout from '@/layout/layout';
import HomePage from '@/pages/home-page';
import NotFoundPage from '@/pages/not-found';

import { About } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
