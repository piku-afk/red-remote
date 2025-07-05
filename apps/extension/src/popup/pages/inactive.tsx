import { Box, Button, Image, Text, Title } from '@mantine/core';
import { useState } from 'react';

import Youtube from '../assets/icons/youtube.svg';

export default function Inactive() {
  const [isLoading, setIsLoading] = useState(false);

  const handleYoutubeRedirect = () => {
    setIsLoading(true);
    chrome.tabs.create({ url: 'https://www.youtube.com/' });
  };

  return (
    <Box ta='center'>
      <Title mt={24} order={2} size='h3'>
        Welcome to Red Remote
      </Title>

      <Text w='100%' mt={8} size='sm' c='dimmed'>
        Use your phone as a remote for YouTube on this device. Just open any YouTube video to get
        started.
      </Text>

      <Button
        fullWidth
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
