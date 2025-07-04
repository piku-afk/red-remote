// import { supabaseClient } from '@red-remote/supabase-client';
// import { nanoid } from 'nanoid';

// const channel = supabaseClient.channel('test-channel');

// channel.subscribe().on('broadcast', { event: 'test-event' }, (payload) => {
//   console.log('Received broadcast:', payload);
// });

// document.querySelector('button')?.addEventListener('click', () => {
//   // channel.send({
//   //   type: 'broadcast',
//   //   event: 'test-event',
//   //   payload: { message: 'Hello from the popup!' },
//   // });

//   console.log(nanoid(10));
// });

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import App from './app';
import Home from './pages/home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>
);
