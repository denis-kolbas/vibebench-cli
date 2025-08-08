import Table from 'cli-table3';
import { LeaderboardEntry, ModelData, VoteType } from './types.js';
import { typography, voteStyles, messages, tableConfig } from './styles.js';

export function formatVoteType(voteType: VoteType): string {
  switch (voteType) {
    case 'fire':
      return voteStyles.fire('Fire');
    case 'mid':
      return voteStyles.mid('Mid');
    case 'cursed':
      return voteStyles.cursed('Cursed');
  }
}

export function formatVibeScore(score: number): string {
  if (score >= 80) return voteStyles.fire(`${score.toFixed(1)}`);
  if (score >= 60) return voteStyles.mid(`${score.toFixed(1)}`);
  if (score >= 40) return typography.highlight(`${score.toFixed(1)}`);
  return voteStyles.cursed(`${score.toFixed(1)}`);
}

export function formatModelStats(model: ModelData): string {
  const table = new Table({
    ...tableConfig,
    head: [
      typography.meta('Rank'),
      typography.meta('Model'),
      typography.meta('Vibe Score'),
      typography.meta('Fire'),
      typography.meta('Mid'),
      typography.meta('Cursed')
    ]
  });

  const rank = ('rank' in model && model.rank) ? `#${(model as LeaderboardEntry).rank}` : '-';
  
  table.push([
    typography.highlight(rank),
    typography.data(model.slug || 'Unknown'),
    formatVibeScore(model.vibeScore || 0),
    voteStyles.fire((model.votes?.fire || 0).toString()),
    voteStyles.mid((model.votes?.mid || 0).toString()),
    voteStyles.cursed((model.votes?.cursed || 0).toString())
  ]);

  return '\n' + table.toString();
}

export function formatLeaderboard(models: LeaderboardEntry[], count: number = 10): string {
  const topModels = models.slice(0, count);
  
  const table = new Table({
    ...tableConfig,
    head: [
      typography.meta('Rank'),
      typography.meta('Model'),
      typography.meta('Vibe Score'),
      typography.meta('Fire'),
      typography.meta('Mid'),
      typography.meta('Cursed')
    ]
  });

  for (const model of topModels) {
    table.push([
      typography.highlight(`#${model.rank}`),
      typography.data(model.slug),
      formatVibeScore(model.vibeScore),
      voteStyles.fire(model.votes.fire.toString()),
      voteStyles.mid(model.votes.mid.toString()),
      voteStyles.cursed(model.votes.cursed.toString())
    ]);
  }

  return '\n' + typography.header(`Top ${count} Models`) + '\n\n' + table.toString();
}

export function formatRateLimitStatus(remaining: number, resetTime: number, maxVotes: number = 3): string {
  const resetDate = new Date(resetTime);
  const now = new Date();
  const minutesUntilReset = Math.ceil((resetDate.getTime() - now.getTime()) / (1000 * 60));
  
  return typography.highlight(`${remaining}/${maxVotes} votes remaining. Next vote resets in ${minutesUntilReset} minutes.`);
}

export function formatSuccess(message: string, details?: string): string {
  const lines = [messages.success(message)];
  if (details) {
    lines.push(typography.meta(details));
  }
  return lines.join('\n');
}

export function formatError(message: string, details?: string): string {
  const lines = [messages.error(message)];
  if (details) {
    lines.push(typography.meta(details));
  }
  return lines.join('\n');
}