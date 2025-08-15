# VibeBench CLI 🚀

[![npm version](https://badge.fury.io/js/vibebench.svg)](https://badge.fury.io/js/vibebench)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/vibebench.svg)](https://nodejs.org/en/)

> **CLI tool for participating in voting on AI vibes on VibeBench.** ⚡  
> Visit [vibebench.io](https://vibebench.io) to see the live leaderboard and vote on the web

![VibeBench Leaderboard](images/leaderboard-screenshot.png)

## Features

- **Interactive & Direct Voting** - Vote on AI models with fire/mid/cursed ratings
- **Real-time Leaderboards** - View top models with vote breakdowns
- **Model Statistics** - Get detailed stats for 200+ AI models
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
vibebench vote claude-3.5-sonnet cursed "deleted half of my codebase"

# View current leaderboard
vibebench top

# List all available models
vibebench models

# Check your voting status
vibebench status

# Get detailed statistics for a model
vibebench stats gpt-5
```

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

- Node.js 18.0.0 or higher
- npm or yarn

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- **Website**: [https://vibebench.io](https://vibebench.io)
- **Repository**: [https://github.com/denis-kolbas/vibebench-cli](https://github.com/denis-kolbas/vibebench-cli)
- **Issues**: [https://github.com/denis-kolbas/vibebench-cli/issues](https://github.com/denis-kolbas/vibebench-cli/issues)
- **NPM Package**: [https://www.npmjs.com/package/vibebench](https://www.npmjs.com/package/vibebench)
