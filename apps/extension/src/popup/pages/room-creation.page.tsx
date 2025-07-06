import { Box, Progress, Text, Title } from '@mantine/core';
import { supabaseClient } from '@red-remote/supabase-client';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { generateRoomCode } from '../utils/generateRoomCode';

export default function RoomCreation() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');

  useEffect(() => {
    let channel: ReturnType<typeof supabaseClient.channel> | null = null;

    const createRoom = async () => {
      // Step 1: Generate room code
      setStatusText('Generating room code...');
      await new Promise((resolve) => setTimeout(resolve, 800));
      const roomCode = generateRoomCode();
      chrome.storage.local.set({ roomCode });
      setProgress(33);

      // Step 2: Create Supabase channel
      setStatusText('Creating Supabase channel...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      channel = supabaseClient.channel(roomCode);
      setProgress(66);

      // Step 3: Subscribe to channel
      setStatusText('Subscribing to channel...');
      await new Promise((resolve) => setTimeout(resolve, 800));
      channel.subscribe();
      setProgress(100);

      // Step 4: Complete
      setStatusText('Room created successfully!');
      await new Promise((resolve) => setTimeout(resolve, 500));
    };

    createRoom();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  return (
    <Box
      maw={200}
      mx='auto'
      ta='center'
      component={motion.div}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }}>
      <Title order={1} size='h4'>
        Creating Room
      </Title>
      <Progress mt={24} color='#ff0000' value={progress} />

      <Box mt={16} style={{ height: '20px', overflow: 'hidden' }}>
        <Text
          size='sm'
          c='dimmed'
          component={motion.p}
          key={statusText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            duration: 0.3,
          }}>
          {statusText}
        </Text>
      </Box>
    </Box>
  );
}
