import { VibeBenchAPI } from '../lib/api-client.js';
import { formatModelStats, formatError } from '../lib/formatters.js';

export async function statsCommand(api: VibeBenchAPI, modelSlug: string): Promise<void> {
  try {
    const model = await api.getModelStats(modelSlug);
    console.log(formatModelStats(model));
  } catch (error) {
    console.log(formatError('Failed to get model stats', error instanceof Error ? error.message : 'Unknown error'));
  }
}