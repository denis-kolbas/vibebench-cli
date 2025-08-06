import { VibeBenchAPI } from '../lib/api-client.js';
import { formatError } from '../lib/formatters.js';
import chalk from 'chalk';

export async function modelsCommand(api: VibeBenchAPI): Promise<void> {
  try {
    const models = await api.getLeaderboard();
    
    console.log(chalk.bold.white(`📋 Available Models (${models.length})`));
    console.log('');
    
    // Group by category
    const categories = models.reduce((acc, model) => {
      if (!acc[model.category]) {
        acc[model.category] = [];
      }
      acc[model.category].push(model);
      return acc;
    }, {} as Record<string, typeof models>);
    
    // Display by category
    Object.entries(categories).forEach(([category, categoryModels]) => {
      console.log(chalk.bold.cyan(category));
      categoryModels.forEach(model => {
        const score = model.vibeScore.toFixed(1);
        const votes = model.votes.total;
        console.log(`  ${chalk.white(model.slug.padEnd(30))} Score: ${score.padStart(5)} (${votes} votes)`);
      });
      console.log('');
    });
  } catch (error) {
    console.log(formatError('Failed to get models list', error instanceof Error ? error.message : 'Unknown error'));
  }
}