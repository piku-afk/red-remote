import { Image, Paper } from '@mantine/core';
import { useEffect, useState } from 'react';

import RedRemote from './assets/icons/red-remote.svg';
import Home from './pages/home';
import Inactive from './pages/inactive';

export default function App() {
  const [isYoutubeTab, setIsYoutubeTab] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      try {
        const hostname = new URL(tabs[0]?.url || '').hostname;
        const youtubeHostnames = ['www.youtube.com', 'm.youtube.com', 'youtube.com', 'youtu.be'];
        setIsYoutubeTab(youtubeHostnames.includes(hostname));
      } catch {
        setIsYoutubeTab(false);
      }
    });
  }, []);

  return (
    <Paper w={import.meta.env.RR_APP_WIDTH} px={16} py={48} bg='#fafafa'>
      <Image w={32} h={32} mx='auto' src={RedRemote} alt='RedRemote Logo' />
      {isYoutubeTab ? <Home /> : <Inactive />}
    </Paper>
  );
}
