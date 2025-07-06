const YOUTUBE_HOSTNAMES = ['www.youtube.com', 'm.youtube.com', 'youtube.com', 'youtu.be'] as const;

/**
 * Checks if the currently active tab is a YouTube page
 * @returns Promise<boolean> - true if active tab is YouTube, false otherwise
 */
export async function isYoutubeTab(): Promise<boolean> {
  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!activeTab?.url) {
      return false;
    }

    const { hostname } = new URL(activeTab.url);

    return YOUTUBE_HOSTNAMES.includes(hostname as (typeof YOUTUBE_HOSTNAMES)[number]);
  } catch {
    return false;
  }
}

/**
 * Finds an existing YouTube tab
 * @returns Promise<chrome.tabs.Tab | null> - The YouTube tab if found, null otherwise
 */
export async function findYouTubeTab(): Promise<chrome.tabs.Tab | null> {
  const tabs = await chrome.tabs.query({});

  for (const tab of tabs) {
    if (tab.url) {
      try {
        const { hostname } = new URL(tab.url);
        if (YOUTUBE_HOSTNAMES.includes(hostname as (typeof YOUTUBE_HOSTNAMES)[number])) {
          return tab;
        }
      } catch {
        // Invalid URL, skip this tab
        continue;
      }
    }
  }

  return null;
}

/**
 * Switches to an existing YouTube tab or creates a new one
 * @returns Promise<void>
 */
export async function switchToYouTube(): Promise<void> {
  const existingYouTubeTab = await findYouTubeTab();

  if (existingYouTubeTab?.id) {
    // Focus on the existing YouTube tab
    await chrome.tabs.update(existingYouTubeTab.id, { active: true });
    // Also bring the window to front
    if (existingYouTubeTab.windowId) {
      await chrome.windows.update(existingYouTubeTab.windowId, { focused: true });
    }
  } else {
    // Create a new YouTube tab
    await chrome.tabs.create({ url: 'https://www.youtube.com/' });
  }
}
