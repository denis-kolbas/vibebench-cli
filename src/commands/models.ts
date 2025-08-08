import { VibeBenchAPI } from '../lib/api-client.js';
import { formatError } from '../lib/formatters.js';
import { typography } from '../lib/styles.js';

export async function modelsCommand(api: VibeBenchAPI): Promise<void> {
  try {
    const models = await api.getLeaderboard();
    
    console.log('\n' + typography.header(`Available Models (${models.length})`));
    console.log('');
    
    // Simple ranked list of model slugs
    models.forEach(model => {
      const rank = typography.meta(`#${model.rank.toString().padStart(2)}`);
      console.log(`${rank} ${typography.data(model.slug)}`);
    });
    
  } catch (error) {
    console.log(formatError('Failed to get models list', error instanceof Error ? error.message : 'Unknown error'));
  }
}