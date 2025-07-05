import { createMemoryRouter } from 'react-router';
import AppLayout from './layout/app.layout';
import Home from './pages/home.page';
import Inactive from './pages/inactive.page';
import TabDetector, { tabDetectorLoader } from './pages/tab-detector.page';
import { ROUTES } from './constants/routes';

export const router = createMemoryRouter([
  {
    Component: AppLayout,
    children: [
      { path: ROUTES.TAB_DETECTOR, index: true, Component: TabDetector, loader: tabDetectorLoader },
      { path: ROUTES.HOME, Component: Home },
      { path: ROUTES.INACTIVE, Component: Inactive },
    ],
  },
]);
