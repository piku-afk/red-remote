import { Box, Button, Image, Text, Title } from '@mantine/core';
import Youtube from '../assets/icons/youtube.svg';
import RedRemote from '../assets/icons/red-remote.svg';
import { useState } from 'react';

export default function Inactive() {
  const [isLoading, setIsLoading] = useState(false);

  const handleYoutubeRedirect = () => {
    setIsLoading(true);
    chrome.tabs.create({ url: 'https://www.youtube.com/' });
  };

  return (
    <Box ta='center'>
      <Image w={32} h={32} mx='auto' src={RedRemote} alt='RedRemote Logo' />
      <Title mt={24} mb={8} order={2}>
        Welcome to Red Remote
      </Title>
      <Text w='100%' size='sm' c='dimmed'>
        Use your phone as a remote for YouTube on your computer. Just open any YouTube video to get
        started.
      </Text>

      <Button
        radius='md'
        loading={isLoading}
        mt={24}
        variant='default'
        onClick={handleYoutubeRedirect}
        leftSection={<Image w={16} h={16} src={Youtube} alt='YouTube icon' />}>
        Go to YouTube
      </Button>
    </Box>
  );
}
