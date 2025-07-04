import { supabaseClient } from '@red-remote/supabase-client';

import { useEffect } from 'react';
const channel = supabaseClient.channel('test-channel');

export default function App() {
  useEffect(() => {
    channel.subscribe().on('broadcast', { event: 'test-event' }, (payload) => {
      console.log('Received broadcast:', payload);
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className='App'>
      <h1>Welcome to the Red Remote App</h1>
      <p>This app is designed to work with Supabase for real-time data updates.</p>
      <p>Check the console for any messages or errors.</p>

      <button
        onClick={() => {
          channel.send({
            type: 'broadcast',
            event: 'test-event',
            payload: { message: 'Hello from the web app!' },
          });
        }}>
        Test Button
      </button>
    </div>
  );
}
