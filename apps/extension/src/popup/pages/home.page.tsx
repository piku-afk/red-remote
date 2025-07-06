import { Box, Button, Text, Title } from '@mantine/core';
import { motion } from 'motion/react';
import { Link, useNavigation } from 'react-router';

import { ROUTES } from '../constants/routes';

export default function Home() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }}
      ta='center'>
      <Title mt={24} order={2} size='h3'>
        Ready to Connect
      </Title>

      <Text size='sm' c='dimmed' mt={8}>
        Use your phone as a remote for YouTube on this device. Tap below to create your room and get
        started.
      </Text>

      <Button
        component={Link}
        to={{ pathname: ROUTES.ROOM_CREATION }}
        mt={24}
        fullWidth
        size='md'
        radius='sm'
        variant='default'
        loading={isNavigating}>
        Create Room
      </Button>
    </Box>
  );
}
