import { Box, Button, Code, Text, Title } from '@mantine/core';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [roomCode, setRoomCode] = useState<string | null>(null);

  const handleGenerateRoomCode = () => {
    setIsLoading(true);
    const roomCode = nanoid(10);
    setRoomCode(roomCode);
    setIsLoading(false);
  };

  return (
    <Box ta='center'>
      <Title mt={24} order={2} size='h3'>
        Ready to Connect
      </Title>

      <Text size='sm' c='dimmed' mt={8}>
        Use your phone as a remote for YouTube on this device. Tap below to create your room and get
        started.
      </Text>

      <Button
        mt={24}
        fullWidth
        size='md'
        radius='sm'
        variant='default'
        loading={isLoading}
        onClick={handleGenerateRoomCode}>
        Generate Room Code
      </Button>

      <Text mt={8} size='xs' c='dimmed'>
        Code: <Code>{roomCode}</Code> will expire if no one joins within 5 minutes.
      </Text>
    </Box>
  );
}
