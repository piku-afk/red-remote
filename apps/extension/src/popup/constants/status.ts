export enum INITIALIZATION_STATUS {
  INITIALIZING = 'Initializing...',
  CHECKING_ROOM = 'Checking for active room...',
  LOADING_ROOM = 'Loading room...',
  DETECTING_TAB = 'Detecting current tab...',
  YOUTUBE_DETECTED = 'YouTube detected',
  TAB_NOT_SUPPORTED = 'Tab not supported',
}

export enum ROOM_CREATION_STATUS {
  INITIALIZING = 'Initializing...',
  GENERATING_CODE = 'Generating room code...',
  CREATING_CHANNEL = 'Creating Supabase channel...',
  ROOM_CREATED = 'Room created successfully!',
}
