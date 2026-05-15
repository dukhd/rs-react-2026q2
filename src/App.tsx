import type { JSX } from 'react';
import { RouterProvider } from 'react-router/dom';

import { router } from './routing/router';

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
