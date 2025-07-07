import { Box, Button, Stack, Text, TextInput } from '@mantine/core';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Home() {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-alphanumeric characters and convert to uppercase
    const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    setRoomCode(value);
  };

  const formatRoomCode = (code: string) => {
    // Format like Google Meet: ABC DEFG HIJ
    if (code.length <= 3) {
      return code;
    }
    return `${code.slice(0, 3)} ${code.slice(3, 7)} ${code.slice(7, 10)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim()) {
      navigate(`/room/${roomCode.trim().toUpperCase()}`);
    }
  };

  return (
    <Box
      maw={280}
      mx='auto'
      ta='center'
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.6,
      }}>
      <Stack gap='md'>
        <Box
          component={motion.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>
          <Stack gap='md'>
            <TextInput
              label='Join a room to get started'
              placeholder='abc-defg-hij'
              value={formatRoomCode(roomCode)}
              onChange={handleRoomCodeChange}
              size='md'
              radius='md'
              styles={{
                input: {
                  textAlign: 'center',
                  letterSpacing: '2px',
                  fontWeight: 600,
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  padding: '12px 16px',
                },
                label: {
                  textAlign: 'center',
                  width: '100%',
                  marginBottom: '8px',
                  fontWeight: 500,
                },
              }}
            />

            <Button
              type='submit'
              size='md'
              fullWidth
              radius='md'
              disabled={!roomCode.trim()}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}>
              Join Room
            </Button>
          </Stack>
        </Box>

        <Text
          size='xs'
          c='dimmed'
          ta='center'
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}>
          Enter the room code shared with you to connect
        </Text>
      </Stack>
    </Box>
  );
}
