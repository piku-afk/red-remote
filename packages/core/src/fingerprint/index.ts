import FingerprintJS, { type GetResult } from '@fingerprintjs/fingerprintjs';

/**
 * Generate browser fingerprint
 */
export async function generateFingerprint(): Promise<{
  fingerprintId: string;
  rawData: GetResult;
}> {
  const fp = await FingerprintJS.load();
  const result = await fp.get();

  return {
    fingerprintId: result.visitorId,
    rawData: result,
  };
}
