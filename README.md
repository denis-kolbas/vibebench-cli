# VibeBench CLI

Vote on AI models directly from your terminal.

## Installation

```bash
npm install -g vibebench
```

## Usage

### Vote on models
```bash
# Interactive mode
vibebench vote

# Quick vote
vibebench vote claude-3.5-sonnet fire "Great reasoning!"
vibebench vote gpt-4o mid
```

### Check statistics
```bash
# Model stats
vibebench stats claude-3.5-sonnet

# Leaderboard
vibebench top --count 10

# Rate limit status
vibebench status
```

### List models
```bash
vibebench models
```

## Commands

- `vote [model] [type] [comment]` - Vote on a model (interactive if no args)
- `stats <model>` - Get model statistics
- `top [--count N]` - Show leaderboard (default: 10)
- `models` - List all available models
- `status` - Check your rate limit status
- `help` - Show help

## Vote Types

- `fire` 🔥 - Excellent performance
- `mid` 😊 - Average performance  
- `cursed` 💀 - Poor performance

## Development

```bash
git clone https://github.com/denis-kolbas/vibebench-cli.git
cd vibebench-cli
npm install
npm run build
npm link
```

## License

MIT