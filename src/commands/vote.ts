import inquirer from 'inquirer';
import { VibeBenchAPI } from '../lib/api-client.js';
import { VoteType } from '../lib/types.js';
import { formatVoteType, formatSuccess, formatError, formatModelStats } from '../lib/formatters.js';

export async function voteCommand(api: VibeBenchAPI, model?: string, type?: string, comment?: string): Promise<void> {
  try {
    // If no arguments provided, enter interactive mode
    if (!model || !type) {
      return await interactiveVote(api);
    }

    // Validate vote type
    if (!isValidVoteType(type)) {
      console.log(formatError('Invalid vote type. Use: fire, mid, or cursed'));
      return;
    }

    // Submit vote
    const response = await api.vote({
      modelSlug: model,
      voteType: type as VoteType,
      comment
    });

    if (response.success) {
      console.log(formatSuccess(`Voted ${formatVoteType(type as VoteType)} for ${model}`));
      
      if (response.model) {
        console.log('');
        console.log(formatModelStats(response.model));
      }
      
      if (response.remaining !== undefined) {
        console.log('');
        console.log(`Votes remaining: ${response.remaining}`);
      }
    } else {
      console.log(formatError('Vote failed', response.message));
    }
  } catch (error) {
    console.log(formatError('Failed to submit vote', error instanceof Error ? error.message : 'Unknown error'));
  }
}

async function interactiveVote(api: VibeBenchAPI): Promise<void> {
  try {
    // Get available models
    const models = await api.getLeaderboard();
    
    // Interactive prompts
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'model',
        message: 'Select a model to vote on:',
        choices: models.map(m => ({
          name: `${m.name} (${m.slug}) - Rank #${m.rank}`,
          value: m.slug
        })),
        pageSize: 10
      },
      {
        type: 'list',
        name: 'voteType',
        message: 'How would you rate this model?',
        choices: [
          { name: '🔥 Fire - Excellent performance', value: 'fire' },
          { name: '😊 Mid - Average performance', value: 'mid' },
          { name: '💀 Cursed - Poor performance', value: 'cursed' }
        ]
      },
      {
        type: 'input',
        name: 'comment',
        message: 'Optional comment:',
        default: ''
      }
    ]);

    // Submit vote
    const response = await api.vote({
      modelSlug: answers.model,
      voteType: answers.voteType,
      comment: answers.comment || undefined
    });

    if (response.success) {
      console.log('');
      console.log(formatSuccess(`Voted ${formatVoteType(answers.voteType)} for ${answers.model}`));
      
      if (response.model) {
        console.log('');
        console.log(formatModelStats(response.model));
      }
    } else {
      console.log(formatError('Vote failed', response.message));
    }
  } catch (error) {
    console.log(formatError('Interactive vote failed', error instanceof Error ? error.message : 'Unknown error'));
  }
}

function isValidVoteType(type: string): type is VoteType {
  return ['fire', 'mid', 'cursed'].includes(type);
}