/**
 * Extension icon states
 */
export enum ICON_STATE {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

/**
 * Updates the extension icon based on the current state
 * @param state - The icon state to set
 */
export function setExtensionIcon(state: ICON_STATE): void {
  const iconPath = {
    16: `/icons/${state}-icon-16.png`,
    32: `/icons/${state}-icon-32.png`,
  };

  chrome.action.setIcon({ path: iconPath });
}

/**
 * Sets the extension icon to active state
 */
export function setActiveIcon(): void {
  setExtensionIcon(ICON_STATE.ACTIVE);
}

/**
 * Sets the extension icon to inactive state
 */
export function setInactiveIcon(): void {
  setExtensionIcon(ICON_STATE.INACTIVE);
}

/**
 * Sets the extension icon to pending state
 */
export function setPendingIcon(): void {
  setExtensionIcon(ICON_STATE.PENDING);
}
