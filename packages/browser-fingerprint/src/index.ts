import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fpPromise = FingerprintJS.load();

/**
 * Generates a unique browser fingerprint for the current visitor.
 */
export const generateBrowserFingerprint = async (): Promise<string> => {
  const fp = await fpPromise;
  const result = await fp.get();

  return result.visitorId;
};
