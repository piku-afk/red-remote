import { Box, Button, Code, Stack, Text, Title } from '@mantine/core';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router';

export default function Room() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box
      maw={280}
      mx='auto'
      ta='center'
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }}>
      <Stack gap='xl'>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          <Title order={1} size='h2' mb='sm'>
            Welcome to Room
          </Title>
          <Text size='md' c='dimmed'>
            You've successfully joined the room
          </Text>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <Text size='sm' c='dimmed' mb='xs'>
            Room Code
          </Text>
          <Code
            style={{
              fontSize: '18px',
              fontWeight: 600,
              padding: '8px 16px',
              letterSpacing: '2px',
            }}>
            {roomCode}
          </Code>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          <Text size='md' c='dimmed' ta='center'>
            🎉 Room is now active! You can start controlling the YouTube playback from your
            extension.
          </Text>
        </Box>

        <Button
          variant='light'
          size='md'
          onClick={handleBackToHome}
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}>
          Back to Home
        </Button>

        <Text
          size='xs'
          c='dimmed'
          ta='center'
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}>
          Keep this page open to maintain the connection
        </Text>
      </Stack>
    </Box>
  );
}
