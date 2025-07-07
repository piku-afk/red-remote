import { Box, Progress, Text, Title } from '@mantine/core';
import { supabaseClient } from '@red-remote/core/client';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '../constants/routes';
import { ROOM_CREATION_STATUS } from '../constants/status';
import { setInactiveIcon, setPendingIcon } from '../utils/extensionIcon';
import { generateRoomCode } from '../utils/generateRoomCode';
import { setRoomCode } from '../utils/roomStorage';

export default function RoomCreation() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(ROOM_CREATION_STATUS.INITIALIZING);
  const navigate = useNavigate();

  useEffect(() => {
    let channel: ReturnType<typeof supabaseClient.channel> | null = null;

    const createRoom = async () => {
      try {
        // Set extension icon to pending state
        setPendingIcon();

        // Step 1: Generate room code
        setStatusText(ROOM_CREATION_STATUS.GENERATING_CODE);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const roomCode = generateRoomCode();
        await setRoomCode(roomCode);
        setProgress(33);

        // Step 2: Create Supabase channel
        setStatusText(ROOM_CREATION_STATUS.CREATING_CHANNEL);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        channel = supabaseClient.channel(roomCode);
        setProgress(66);

        // Step 3: Complete
        setStatusText(ROOM_CREATION_STATUS.ROOM_CREATED);
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Navigate to room display page
        navigate(ROUTES.ROOM);
      } catch (error) {
        // Reset icon to inactive state on error
        setInactiveIcon();
        console.error('Room creation failed:', error);
        // Navigate back to home or show error state
        navigate(ROUTES.HOME);
      }
    };

    createRoom();

    return () => {
      if (channel) {
        supabaseClient.removeChannel(channel);
      }
    };
  }, [navigate]);

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
