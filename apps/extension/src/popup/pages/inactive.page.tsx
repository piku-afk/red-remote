import { Box, Button, Image, Text, Title } from '@mantine/core';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import Youtube from '../assets/icons/youtube.svg';
import { checkRoomCode } from '../utils/roomStorage';
import { switchToYouTube } from '../utils/youtubeTab';

export default function Inactive() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasExistingRoom, setHasExistingRoom] = useState(false);

  useEffect(() => {
    const checkExistingRoom = async () => {
      const roomExists = await checkRoomCode();
      setHasExistingRoom(roomExists);
    };

    checkExistingRoom();
  }, []);

  const handleYoutubeRedirect = async () => {
    setIsLoading(true);

    try {
      await switchToYouTube();
    } catch (error) {
      console.error('Failed to switch to YouTube:', error);
      // Fallback: just create a new tab
      chrome.tabs.create({ url: 'https://www.youtube.com/' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }}
      ta='center'>
      <Title mt={24} order={2} size='h3'>
        {hasExistingRoom ? 'Room Ready' : 'Welcome to Red Remote'}
      </Title>

      <Text w='100%' mt={8} size='sm' c='dimmed'>
        {hasExistingRoom
          ? 'You have an active room ready. Switch to YouTube to continue using your phone as a remote.'
          : 'Use your phone as a remote for YouTube on this device. Just open any YouTube video to get started.'}
      </Text>

      <Button
        fullWidth
        radius='md'
        loading={isLoading}
        mt={24}
        variant='default'
        onClick={handleYoutubeRedirect}
        leftSection={<Image w={16} h={16} src={Youtube} alt='YouTube icon' />}>
        {hasExistingRoom ? 'Continue with YouTube' : 'Switch to YouTube'}
      </Button>
    </Box>
  );
}
