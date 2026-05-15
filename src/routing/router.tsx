import { createBrowserRouter } from 'react-router';

import Layout from '@/layout/layout';
import HomePage from '@/pages/home-page';

import { About, NotFound } from './pages';

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
        element: <NotFound />,
      },
    ],
  },
]);
