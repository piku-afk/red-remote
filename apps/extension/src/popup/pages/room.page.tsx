import { Box, Button, Code, Group, Stack, Text, Title } from '@mantine/core';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '../constants/routes';
import { clearRoomCode, getRoomCode } from '../utils/roomStorage';

export default function Room() {
  const [roomCode, setRoomCode] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get room code from chrome storage
    const loadRoomCode = async () => {
      const code = await getRoomCode();
      if (code) {
        setRoomCode(code);
      } else {
        // If no room code, navigate back to home
        navigate(ROUTES.HOME);
      }
    };

    loadRoomCode();
  }, [navigate]);

  const handleDisconnect = async () => {
    // Clear room code from storage
    await clearRoomCode();
    // Navigate back to home
    navigate(ROUTES.HOME);
  };

  const googleUrl = `https://google.com/${roomCode}`;

  if (!roomCode) {
    return null; // Will navigate away in useEffect
  }

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
      <Stack gap='md'>
        <Title order={1} size='h4'>
          Room Active
        </Title>

        <Box>
          <Text size='sm' c='dimmed' mb='xs'>
            Room Code
          </Text>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}>
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
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}>
          <Text size='sm' c='dimmed' mb='xs'>
            Scan to join: google.com/{roomCode}
          </Text>
          <Box
            style={{
              display: 'inline-block',
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
            }}>
            <QRCodeSVG value={googleUrl} size={120} bgColor='#ffffff' fgColor='#000000' level='M' />
          </Box>
        </Box>

        <Group justify='center' mt='sm'>
          <Button
            variant='light'
            color='red'
            size='sm'
            onClick={handleDisconnect}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Disconnect
          </Button>
        </Group>

        <Text
          size='xs'
          c='dimmed'
          ta='center'
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Room will expire after 5 minutes of inactivity
        </Text>
      </Stack>
    </Box>
  );
}
