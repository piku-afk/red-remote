import { useEffect, useState } from 'react';

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

  return isYoutubeTab ? <Home /> : <Inactive />;
}
