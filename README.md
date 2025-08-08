# VibeBench CLI 🚀

[![npm version](https://badge.fury.io/js/vibebench.svg)](https://badge.fury.io/js/vibebench)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/vibebench.svg)](https://nodejs.org/en/)

> **Vote on AI models directly from your terminal** ⚡

My personal CLI tool for participating in AI model rankings on VibeBench. Clean, fast, and built with professional TypeScript practices.

## Features

- **Interactive & Direct Voting** - Vote on AI models with fire/mid/cursed ratings
- **Real-time Leaderboards** - View top models with vote breakdowns
- **Model Statistics** - Get detailed stats for any AI model
- **Rate Limit Tracking** - Monitor your voting quota
- **Fuzzy Search** - Smart model name suggestions for typos
- **Zero Configuration** - Works out of the box

## Quick Start

### Installation

```bash
# Install globally via npm
npm install -g vibebench

# Or run directly with npx (no installation)
npx vibebench --help
```

### Usage

```bash
# Interactive voting (recommended for first-time users)
vibebench vote

# Direct voting
vibebench vote claude-3.5-sonnet fire "Amazing reasoning capabilities!"

# View current leaderboard
vibebench top

# List all available models
vibebench models

# Check your voting status
vibebench status

# Get detailed statistics for a model
vibebench stats gpt-4o
```

## 📖 Commands

| Command                         | Description                              | Example                                         |
| ------------------------------- | ---------------------------------------- | ----------------------------------------------- |
| `vote [model] [type] [comment]` | Vote on a model (interactive if no args) | `vibebench vote gpt-4 fire "Great performance"` |
| `top [count]`                   | Show leaderboard (default: top 10)       | `vibebench top 5`                               |
| `models`                        | List all available models by rank        | `vibebench models`                              |
| `stats <model>`                 | Get detailed statistics for a model      | `vibebench stats claude-3.5-sonnet`             |
| `status`                        | Check your rate limit and voting quota   | `vibebench status`                              |

## Vote Types

- 🔥 **`fire`** - Nailed it
- 😐 **`mid`** - Just okay
- 💀 **`cursed`** - Major miss

## Example Output

### Leaderboard View

```
Top 10 Models

┌──────┬───────────────────┬────────────┬──────┬─────┬────────┐
│ Rank │ Model             │ Vibe Score │ Fire │ Mid │ Cursed │
├──────┼───────────────────┼────────────┼──────┼─────┼────────┤
│ #1   │ claude-3.5-sonnet │ 30.1       │ 3    │ 0   │ 1      │
├──────┼───────────────────┼────────────┼──────┼─────┼────────┤
│ #2   │ gpt-4o            │ 12.5       │ 0    │ 3   │ 0      │
└──────┴───────────────────┴────────────┴──────┴─────┴────────┘
```

### Interactive Voting

```
► Select a model to vote on
  claude-3.5-sonnet
  gpt-4o
  gemini-1.5-pro
  (Use arrow keys, Enter to select)

► How would you rate this model
  🔥 Fire - Excellent
  😐 Mid - Average
  💀 Cursed - Poor
```

## Development

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/denis-kolbas/vibebench-cli.git
cd vibebench-cli

# Install dependencies
npm install

# Build the project
npm run build

# Run locally
npm start -- --help
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm start` - Run the compiled CLI
- `npm test` - Run test suite (when implemented)
- `npm run clean` - Clean build directory

## 📁 Project Structure

```
vibebench-cli/
├── src/
│   ├── commands/          # CLI command implementations
│   │   ├── vote.ts       # Voting functionality
│   │   ├── top.ts        # Leaderboard display
│   │   ├── models.ts     # Model listing
│   │   ├── stats.ts      # Model statistics
│   │   └── status.ts     # Rate limit status
│   ├── lib/
│   │   ├── api-client.ts # VibeBench API wrapper
│   │   ├── formatters.ts # Output formatting utilities
│   │   ├── styles.ts     # Consistent styling system
│   │   └── types.ts      # TypeScript type definitions
│   └── index.ts          # Main CLI entry point
├── bin/                  # Executable scripts
└── dist/                # Compiled JavaScript (generated)
```

## 🔧 Built By Denis Kolbas

My personal CLI tool for VibeBench, built with modern TypeScript and CLI best practices:

- **[Commander.js](https://github.com/tj/commander.js/)** - Command-line framework
- **[Inquirer.js](https://github.com/SBoudrias/Inquirer.js)** - Interactive command prompts
- **[cli-table3](https://github.com/cli-table/cli-table3)** - Professional table formatting
- **[Chalk](https://github.com/chalk/chalk)** - Terminal styling
- **TypeScript** - Type-safe JavaScript

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- **Website**: [https://vibebench.io](https://vibebench.io)
- **Repository**: [https://github.com/denis-kolbas/vibebench-cli](https://github.com/denis-kolbas/vibebench-cli)
- **Issues**: [https://github.com/denis-kolbas/vibebench-cli/issues](https://github.com/denis-kolbas/vibebench-cli/issues)
- **NPM Package**: [https://www.npmjs.com/package/vibebench](https://www.npmjs.com/package/vibebench)
