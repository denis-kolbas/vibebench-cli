import { VibeBenchAPI } from '../lib/api-client.js';
import { formatRateLimitStatus, formatError } from '../lib/formatters.js';

export async function statusCommand(api: VibeBenchAPI): Promise<void> {
  try {
    const status = await api.getRateLimitStatus();
    console.log('\n' + formatRateLimitStatus(status.remaining, status.resetTime));
  } catch (error) {
    console.log(formatError('Failed to get rate limit status', error instanceof Error ? error.message : 'Unknown error'));
  }
}