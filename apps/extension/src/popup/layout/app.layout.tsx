import { Image, Paper } from '@mantine/core';
import { Outlet, useLocation } from 'react-router';
import { motion } from 'motion/react';

import RedRemote from '../assets/icons/red-remote.svg';
import { ROUTES } from '../constants/routes';

// Routes that should show the large image (128x128)
const LARGE_IMAGE_ROUTES: string[] = [ROUTES.TAB_DETECTOR];

export default function AppLayout() {
  const location = useLocation();
  const isLargeImagePage = LARGE_IMAGE_ROUTES.includes(location.pathname);
  
  const imageSize = isLargeImagePage ? 128 : 64;
  const marginBottom = isLargeImagePage ? 24 : 16;

  return (
    <Paper w={import.meta.env.RR_APP_WIDTH} px={16} py={48} bg='#fafafa'>
      <Image
        component={motion.img}
        animate={{
          width: imageSize,
          height: imageSize,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          duration: 0.3,
        }}
        w={imageSize}
        h={imageSize}
        mb={marginBottom}
        mx='auto'
        src={RedRemote}
        alt='Red Remote Extension Icon'
      />

      <Outlet />
    </Paper>
  );
}
