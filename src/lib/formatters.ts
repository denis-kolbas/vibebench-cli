import chalk from 'chalk';
import { LeaderboardEntry, ModelData, VoteType } from './types.js';

export function formatVoteType(voteType: VoteType): string {
  switch (voteType) {
    case 'fire':
      return chalk.green('🔥 Fire');
    case 'mid':
      return chalk.yellow('😊 Mid');
    case 'cursed':
      return chalk.red('💀 Cursed');
  }
}

export function formatVibeScore(score: number): string {
  if (score >= 80) return chalk.green(`${score.toFixed(1)}`);
  if (score >= 60) return chalk.yellow(`${score.toFixed(1)}`);
  if (score >= 40) return chalk.orange(`${score.toFixed(1)}`);
  return chalk.red(`${score.toFixed(1)}`);
}

export function formatModelStats(model: ModelData): string {
  const lines = [
    chalk.bold.white(`📊 ${model.name}`),
    `${chalk.gray('Slug:')} ${model.slug}`,
    `${chalk.gray('Category:')} ${model.category}`,
    `${chalk.gray('Vibe Score:')} ${formatVibeScore(model.vibeScore)}`,
    '',
    chalk.bold('Vote Breakdown:'),
    `  🔥 Fire: ${chalk.green(model.votes.fire.toString())}`,
    `  😊 Mid: ${chalk.yellow(model.votes.mid.toString())}`,
    `  💀 Cursed: ${chalk.red(model.votes.cursed.toString())}`,
    `  ${chalk.gray('Total:')} ${model.votes.total}`,
  ];

  if ('rank' in model) {
    lines.splice(1, 0, `${chalk.gray('Rank:')} #${(model as LeaderboardEntry).rank}`);
  }

  return lines.join('\\n');
}

export function formatLeaderboard(models: LeaderboardEntry[], count: number = 10): string {
  const topModels = models.slice(0, count);
  
  const lines = [
    chalk.bold.white(`🏆 Top ${count} Models`),
    '',
  ];

  for (const model of topModels) {
    const rank = chalk.gray(`#${model.rank.toString().padStart(2)}`);
    const score = formatVibeScore(model.vibeScore);
    const name = chalk.white(model.name);
    const votes = chalk.gray(`(${model.votes.total} votes)`);
    
    lines.push(`${rank} ${score.padEnd(10)} ${name} ${votes}`);
  }

  return lines.join('\\n');
}

export function formatRateLimitStatus(remaining: number, resetTime: number): string {
  const resetDate = new Date(resetTime);
  const now = new Date();
  const minutesUntilReset = Math.ceil((resetDate.getTime() - now.getTime()) / (1000 * 60));
  
  if (remaining <= 0) {
    return chalk.red(`⏰ No votes remaining. Resets in ${minutesUntilReset} minutes.`);
  }
  
  const color = remaining <= 1 ? chalk.yellow : chalk.green;
  return color(`✅ ${remaining} vote${remaining !== 1 ? 's' : ''} remaining. Resets in ${minutesUntilReset} minutes.`);
}

export function formatSuccess(message: string, details?: string): string {
  const lines = [chalk.green('✅ ' + message)];
  if (details) {
    lines.push(chalk.gray(details));
  }
  return lines.join('\\n');
}

export function formatError(message: string, details?: string): string {
  const lines = [chalk.red('❌ ' + message)];
  if (details) {
    lines.push(chalk.gray(details));
  }
  return lines.join('\\n');
}