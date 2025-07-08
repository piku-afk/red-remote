// packages/core/src/services/healthCheck.ts
import { supabaseClient } from '../client';

export interface HealthCheckResult {
  healthy: boolean;
  database: boolean;
}

/**
 * Perform health check
 */
export async function healthCheck(): Promise<HealthCheckResult> {
  const result: HealthCheckResult = {
    healthy: true,
    database: true,
  };

  try {
    const { error } = await supabaseClient.from('browser_fingerprints').select('id').limit(1);

    const databaseHealthy = !error;
    result.database = databaseHealthy;
    result.healthy = databaseHealthy;
  } catch {
    result.database = false;
    result.healthy = false;
  }

  return result;
}
