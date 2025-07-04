import { supabaseClient } from '@red-remote/supabase-client';

const channel = supabaseClient.channel('test-channel');

channel.subscribe().on('broadcast', { event: 'test-event' }, (payload) => {
  console.log('Received broadcast:', payload);
});

document.querySelector('button')?.addEventListener('click', () => {
  channel.send({
    type: 'broadcast',
    event: 'test-event',
    payload: { message: 'Hello from the popup!' },
  });
});
