import { select, input } from '@inquirer/prompts';
import { VibeBenchAPI } from '../lib/api-client.js';
import { VoteType } from '../lib/types.js';
import { formatVoteType, formatSuccess, formatError, formatModelStats } from '../lib/formatters.js';
import { typography } from '../lib/styles.js';

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

    // Check if model exists and suggest alternatives if not
    const models = await api.getLeaderboard();
    const modelExists = models.some(m => m.slug === model);
    
    if (!modelExists) {
      const suggestions = findSimilarModels(model, models.map(m => m.slug));
      if (suggestions.length > 0) {
        console.log(formatError(`Model "${model}" not found.`));
        console.log(typography.data('Did you mean:'));
        suggestions.slice(0, 3).forEach(suggestion => {
          console.log(`  ${typography.highlight(suggestion)}`);
        });
        return;
      } else {
        console.log(formatError(`Model "${model}" not found. Use 'vibebench models' to see available models.`));
        return;
      }
    }

    // Submit vote
    const response = await api.vote({
      modelSlug: model,
      voteType: type as VoteType,
      comment
    });

    if (response.success) {
      console.log(formatSuccess(`Voted ${formatVoteType(type as VoteType)} for ${model}`));
      
      if (response.updatedModel) {
        // Create proper model data structure from API response
        const modelData = {
          slug: model,
          name: model, // Use slug as name since API doesn't return full model details
          category: 'Unknown',
          vibeScore: response.updatedModel.vibeScore || 0,
          votes: response.updatedModel.votes || { fire: 0, mid: 0, cursed: 0, total: 0 }
        };
        console.log('');
        console.log(formatModelStats(modelData));
      }
      
      if (response.rateLimitRemaining !== undefined) {
        console.log('');
        console.log(`Votes remaining: ${response.rateLimitRemaining}`);
      }
    } else {
      console.log(formatError('Vote failed', response.message));
    }
  } catch (error) {
    console.log(formatError(error instanceof Error ? error.message : 'Unknown error'));
  }
}

async function interactiveVote(api: VibeBenchAPI): Promise<void> {
  try {
    // Get available models
    const models = await api.getLeaderboard();
    
    // Interactive prompts
    const model = await select({
      message: 'Select a model to vote on',
      choices: models.map(m => ({
        name: m.slug,
        value: m.slug
      })),
      pageSize: 20
    });

    const voteType = await select({
      message: 'How would you rate this model',
      choices: [
        { name: '🔥 Fire - Excellent performance', value: 'fire' },
        { name: '😐 Mid - Average performance', value: 'mid' },
        { name: '💀 Cursed - Poor performance', value: 'cursed' }
      ]
    });

    const comment = await input({
      message: 'Optional comment',
      default: ''
    });

    // Submit vote
    const response = await api.vote({
      modelSlug: model,
      voteType: voteType as VoteType,
      comment: comment || undefined
    });

    if (response.success) {
      console.log('');
      console.log(formatSuccess(`Voted ${formatVoteType(voteType as VoteType)} for ${model}`));
      
      if (response.updatedModel) {
        // Create proper model data structure from API response
        const modelData = {
          slug: model,
          name: model, // Use slug as name since API doesn't return full model details
          category: 'Unknown',
          vibeScore: response.updatedModel.vibeScore || 0,
          votes: response.updatedModel.votes || { fire: 0, mid: 0, cursed: 0, total: 0 }
        };
        console.log('');
        console.log(formatModelStats(modelData));
      }
      
      if (response.rateLimitRemaining !== undefined) {
        console.log('');
        console.log(`Votes remaining: ${response.rateLimitRemaining}`);
      }
    } else {
      console.log(formatError('Vote failed', response.message));
    }
  } catch (error) {
    console.log(formatError(error instanceof Error ? error.message : 'Unknown error'));
  }
}

function isValidVoteType(type: string): type is VoteType {
  return ['fire', 'mid', 'cursed'].includes(type);
}

function findSimilarModels(input: string, modelSlugs: string[]): string[] {
  const inputLower = input.toLowerCase();
  const suggestions: { slug: string; score: number }[] = [];
  
  for (const slug of modelSlugs) {
    const slugLower = slug.toLowerCase();
    let score = 0;
    
    // Exact match
    if (slugLower === inputLower) {
      return [slug];
    }
    
    // Contains match
    if (slugLower.includes(inputLower) || inputLower.includes(slugLower)) {
      score += 10;
    }
    
    // Levenshtein distance approximation
    const distance = levenshteinDistance(inputLower, slugLower);
    if (distance <= 3) {
      score += Math.max(0, 5 - distance);
    }
    
    // Common word matches
    const inputWords = inputLower.split(/[-._]/);
    const slugWords = slugLower.split(/[-._]/);
    const commonWords = inputWords.filter(word => slugWords.some(sw => sw.includes(word) || word.includes(sw)));
    score += commonWords.length * 2;
    
    if (score > 0) {
      suggestions.push({ slug, score });
    }
  }
  
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.slug);
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}