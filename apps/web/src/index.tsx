import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router';
import { router } from './router';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
