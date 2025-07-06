import { createMemoryRouter } from 'react-router';

import { ROUTES } from './constants/routes';
import AppLayout from './layout/app.layout';
import Home from './pages/home.page';
import Inactive from './pages/inactive.page';
import Initialization from './pages/initialization.page';
import Room from './pages/room.page';
import RoomCreation from './pages/room-creation.page';

export const router = createMemoryRouter([
  {
    Component: AppLayout,
    children: [
      {
        path: ROUTES.INITIALIZATION,
        index: true,
        Component: Initialization,
      },
      { path: ROUTES.HOME, Component: Home },
      { path: ROUTES.INACTIVE, Component: Inactive },
      { path: ROUTES.ROOM_CREATION, Component: RoomCreation },
      { path: ROUTES.ROOM, Component: Room },
    ],
  },
]);
