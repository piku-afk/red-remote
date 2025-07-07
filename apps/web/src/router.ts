import { createBrowserRouter } from 'react-router';

import { ROUTES } from './constants/routes';
import AppLayout from './layouts/app.layout';
import Home from './pages/Home';
import Room from './pages/Room';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { path: ROUTES.HOME, Component: Home, index: true },
      { path: ROUTES.ROOM, Component: Room },
    ],
  },
]);
