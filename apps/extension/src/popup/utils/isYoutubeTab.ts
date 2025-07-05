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
