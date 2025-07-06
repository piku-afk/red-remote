/**
 * Checks if there is an active room code stored in Chrome storage
 * @returns Promise<boolean> - true if room code exists, false otherwise
 */
export async function checkRoomCode(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['roomCode'], (result) => {
      resolve(!!result.roomCode);
    });
  });
}

/**
 * Gets the current room code from Chrome storage
 * @returns Promise<string | null> - the room code if it exists, null otherwise
 */
export async function getRoomCode(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['roomCode'], (result) => {
      resolve(result.roomCode || null);
    });
  });
}

/**
 * Sets the room code in Chrome storage
 * @param roomCode - the room code to store
 * @returns Promise<void>
 */
export async function setRoomCode(roomCode: string): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ roomCode }, () => {
      resolve();
    });
  });
}

/**
 * Clears the room code from Chrome storage
 * @returns Promise<void>
 */
export async function clearRoomCode(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.remove(['roomCode'], () => {
      resolve();
    });
  });
}
