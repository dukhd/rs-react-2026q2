import { createBrowserRouter } from 'react-router';

import Layout from '@/layout/layout';
import AboutPage from '@/pages/about-page';
import HomePage from '@/pages/home-page';
import NotFoundPage from '@/pages/not-found';

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
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
