import { MantineProvider } from '@mantine/core';
import { AnimatePresence } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import '@mantine/core/styles.css';

import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <AnimatePresence mode='wait'>
        <RouterProvider router={router} />
      </AnimatePresence>
    </MantineProvider>
  </StrictMode>
);
