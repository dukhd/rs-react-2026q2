import { createBrowserRouter } from 'react-router';

import CharacterDetails from '@/components/character-details';
import Layout from '@/layout/layout';
import AboutPage from '@/pages/about-page';
import HomePage from '@/pages/home/home-page';
import NotFoundPage from '@/pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <CharacterDetails />,
          },
        ],
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
