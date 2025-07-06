import { Box, Loader, Text } from '@mantine/core';
import { Suspense, useRef } from 'react';
import { Await, Navigate, useLoaderData, type LoaderFunction } from 'react-router';

import { ROUTES } from '../constants/routes';
import { isYoutubeTab } from '../utils/isYoutubeTab';

export const tabDetectorLoader: LoaderFunction = async () => {
  return { isYoutubeTab: isYoutubeTab() };
};

export default function TabDetector() {
  const { isYoutubeTab } = useLoaderData<{ isYoutubeTab: Promise<boolean> }>();

  return (
    <Suspense
      fallback={
        <Box mt={40} ta='center'>
          <Loader size='sm' color='#ff0000' />

          <Text mt={12} size='sm' c='dimmed'>
            Initializing...
          </Text>

          <Text mt={4} size='xs' c='dimmed' opacity={0.7}>
            Detecting current tab
          </Text>
        </Box>
      }>
      <Await resolve={isYoutubeTab}>
        {(isYoutubeTab) => <Navigate to={isYoutubeTab ? ROUTES.HOME : ROUTES.INACTIVE} replace />}
      </Await>
    </Suspense>
  );
}
