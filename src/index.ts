#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { VibeBenchAPI } from './lib/api-client.js';
import { voteCommand } from './commands/vote.js';
import { statsCommand } from './commands/stats.js';
import { topCommand } from './commands/top.js';
import { modelsCommand } from './commands/models.js';
import { statusCommand } from './commands/status.js';

// Get package.json version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));
const version = packageJson.version;

const program = new Command();
const api = new VibeBenchAPI();

program
  .name('vibebench')
  .description('CLI tool for VibeBench - vote on AI models from your terminal')
  .version(version);

// Register commands
program
  .command('vote')
  .description('Vote on a model (interactive if no arguments)')
  .argument('[model]', 'Model slug to vote on')
  .argument('[type]', 'Vote type: fire, mid, or cursed')
  .argument('[comment]', 'Optional comment')
  .action((model, type, comment) => voteCommand(api, model, type, comment));

program
  .command('stats')
  .description('Get statistics for a specific model')
  .argument('<model>', 'Model slug to get stats for')
  .action((model) => statsCommand(api, model));

program
  .command('top')
  .description('Show leaderboard')
  .option('-c, --count <number>', 'Number of models to show', '10')
  .action((options) => topCommand(api, parseInt(options.count)));

program
  .command('models')
  .description('List all available models')
  .action(() => modelsCommand(api));

program
  .command('status')
  .description('Check your rate limit status')
  .action(() => statusCommand(api));

// Parse command line arguments
program.parse();

// If no command provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}