import { VibeBenchAPI } from '../lib/api-client.js';
import { formatLeaderboard, formatError } from '../lib/formatters.js';

export async function topCommand(api: VibeBenchAPI, count: number = 10): Promise<void> {
  try {
    const models = await api.getLeaderboard();
    console.log(formatLeaderboard(models, count));
  } catch (error) {
    console.log(formatError('Failed to get leaderboard', error instanceof Error ? error.message : 'Unknown error'));
  }
}