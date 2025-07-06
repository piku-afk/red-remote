import { customAlphabet } from 'nanoid';
import { nolookalikesSafe } from 'nanoid-dictionary';

/**
 * Generates a Google Meet style room code (e.g., "abc-defg-hij")
 * @returns A formatted room code string
 */
export const generateRoomCode = (): string => {
  // Use nanoid's nolookalikes alphabet (safe for user input)
  const nanoid = customAlphabet(nolookalikesSafe);

  // Generate segments: 3-4-3 format like Google Meet
  const segment1 = nanoid(3);
  const segment2 = nanoid(4);
  const segment3 = nanoid(3);

  return `${segment1}-${segment2}-${segment3}`;
};
