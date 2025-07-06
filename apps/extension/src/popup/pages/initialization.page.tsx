import { Box, Progress, Text } from '@mantine/core';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '../constants/routes';
import { INITIALIZATION_STATUS } from '../constants/status';
import { isYoutubeTab } from '../utils/isYoutubeTab';
import { checkRoomCode } from '../utils/roomStorage';

export default function Initialization() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(INITIALIZATION_STATUS.INITIALIZING);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      // Step 1: Check for existing room code and current tab
      setStatusText(INITIALIZATION_STATUS.CHECKING_ROOM);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const [hasRoom, isYoutube] = await Promise.all([checkRoomCode(), isYoutubeTab()]);
      setProgress(50);

      // If room exists AND we're on YouTube, go to room page
      if (hasRoom && isYoutube) {
        setStatusText(INITIALIZATION_STATUS.LOADING_ROOM);
        await new Promise((resolve) => setTimeout(resolve, 200));
        setProgress(100);
        navigate(ROUTES.ROOM, { replace: true });
        return;
      }

      // Step 2: Handle other cases
      setStatusText(INITIALIZATION_STATUS.DETECTING_TAB);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProgress(100);

      if (isYoutube) {
        // On YouTube but no room - go to home to create room
        setStatusText(INITIALIZATION_STATUS.YOUTUBE_DETECTED);
        await new Promise((resolve) => setTimeout(resolve, 200));
        navigate(ROUTES.HOME, { replace: true });
      } else {
        // Not on YouTube - go to inactive (regardless of room existence)
        setStatusText(INITIALIZATION_STATUS.TAB_NOT_SUPPORTED);
        await new Promise((resolve) => setTimeout(resolve, 200));
        navigate(ROUTES.INACTIVE, { replace: true });
      }
    };

    initialize();
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
      <Text mb={24} size='h4' fw={600}>
        Initializing
      </Text>

      <Progress color='#ff0000' value={progress} />

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
