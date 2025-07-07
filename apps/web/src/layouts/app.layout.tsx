import {
  Center,
  Container,
  createPolymorphicComponent,
  Image,
  Paper,
  Text,
  Title,
  type TitleProps,
} from '@mantine/core';
import { motion } from 'motion/react';
import { Outlet } from 'react-router';

import RedRemote from '../assets/icons/red-remote.svg';

const PolymorphicTitle = createPolymorphicComponent<'h2', TitleProps>(Title);

export default function AppLayout() {
  return (
    <Center
      style={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        padding: '20px',
      }}>
      <Container p={0} flex={1} ta='center' size='xs' miw={import.meta.env.RR_APP_WIDTH}>
        <Image
          component={motion.img}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.3 }}
          w={64}
          h={64}
          mb='lg'
          mx='auto'
          src={RedRemote}
          alt='Red Remote Logo'
        />
        <PolymorphicTitle
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
          order={1}
          size='h2'
          mb='sm'>
          Welcome to Red Remote
        </PolymorphicTitle>

        <Text
          component={motion.p}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.3 }}
          size='md'
          c='dimmed'
          mb='xl'>
          Control YouTube remotely from your phone on your computer
        </Text>

        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.5,
          }}
          px={16}
          py={32}
          shadow='md'
          radius='md'>
          <Outlet />
        </Paper>
      </Container>
    </Center>
  );
}
