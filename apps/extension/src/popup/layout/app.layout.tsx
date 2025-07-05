import { Image, Paper } from '@mantine/core';
import { Outlet } from 'react-router';

import RedRemote from '../assets/icons/red-remote.svg';

export default function AppLayout() {
  return (
    <Paper w={import.meta.env.RR_APP_WIDTH} px={16} py={48} bg='#fafafa'>
      <Image w={128} h={128} mb={24} mx='auto' src={RedRemote} alt='Red Remote Extension Icon' />

      <Outlet />
    </Paper>
  );
}
