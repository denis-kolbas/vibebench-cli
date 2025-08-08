# Contributing to VibeBench CLI

Thank you for your interest in contributing to VibeBench CLI! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/vibebench-cli.git
   cd vibebench-cli
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Test Your Setup**
   ```bash
   npm start -- --help
   ```

## 🧪 Development Workflow

### Running in Development Mode

```bash
# Watch mode - automatically rebuilds on changes
npm run dev

# Run the CLI locally
npm start -- [command]

# Example: Test the vote command
npm start -- vote --help
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── commands/          # CLI command implementations
│   ├── vote.ts       # Interactive and direct voting
│   ├── top.ts        # Leaderboard display
│   ├── models.ts     # Model listing
│   ├── stats.ts      # Individual model statistics
│   └── status.ts     # Rate limit and quota checking
├── lib/
│   ├── api-client.ts # VibeBench API wrapper
│   ├── formatters.ts # Output formatting utilities
│   ├── styles.ts     # Consistent styling system
│   └── types.ts      # TypeScript type definitions
└── index.ts          # Main CLI entry point
```

## 🎨 Code Style

### TypeScript Guidelines

- Use TypeScript strict mode
- Prefer explicit types over `any`
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Formatting

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Use meaningful commit messages

### Example Code Style

```typescript
// Good: Explicit types and clear naming
export async function getModelStatistics(modelSlug: string): Promise<ModelStats> {
  try {
    const response = await api.getModelStats(modelSlug);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch stats for ${modelSlug}: ${error.message}`);
  }
}

// Avoid: Implicit any and unclear naming
export async function getStats(slug) {
  const resp = await api.getModelStats(slug);
  return resp;
}
```

## 🚦 Contributing Guidelines

### Before You Start

1. **Check Existing Issues** - Look for existing issues or feature requests
2. **Create an Issue** - If your contribution is significant, create an issue first
3. **Discuss** - Get feedback on your proposed changes

### Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make Your Changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Thoroughly**
   ```bash
   npm run build
   npm test
   npm start -- --help  # Test CLI functionality
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new voting analytics feature"
   # or
   git commit -m "fix: handle network timeouts gracefully"
   ```

### Commit Message Format

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```bash
feat: add export functionality for leaderboard data
fix: resolve table alignment issues on Windows
docs: update installation instructions
test: add unit tests for vote validation
```

### Pull Request Process

1. **Push Your Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Use a clear, descriptive title
   - Include a detailed description of changes
   - Reference related issues (`Fixes #123`)
   - Add screenshots for UI changes

3. **Code Review Process**
   - Maintain respectful, constructive discussion
   - Address feedback promptly
   - Be open to suggestions and improvements

## 🐛 Bug Reports

### Before Reporting

1. **Check Existing Issues** - Search for similar issues
2. **Update to Latest Version** - Ensure you're using the latest version
3. **Minimal Reproduction** - Create the smallest possible example

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug

**Steps to Reproduce**
1. Run command `vibebench vote`
2. Select model 'gpt-4'
3. Choose 'fire' rating
4. Error occurs

**Expected Behavior**
Vote should be submitted successfully

**Actual Behavior**
Error: Network timeout

**Environment**
- OS: macOS 13.0
- Node.js: 18.12.0
- VibeBench CLI: 1.0.0
- Terminal: iTerm2
```

## 💡 Feature Requests

We welcome feature requests! Please:

1. **Check existing requests** first
2. **Be specific** about the use case
3. **Provide examples** of how it would work
4. **Consider implementation** complexity

## 🏗 Architecture Guidelines

### API Client (`api-client.ts`)

- Handle all HTTP requests
- Implement proper error handling
- Include retry logic where appropriate
- Type all responses

### Commands (`commands/`)

- Keep commands focused and single-purpose
- Use consistent error handling patterns
- Provide helpful error messages
- Include input validation

### Formatters (`formatters.ts`)

- Maintain consistent styling
- Use the centralized styles system
- Handle edge cases gracefully
- Keep formatting logic separate from business logic

### Styles (`styles.ts`)

- Centralize all color and styling definitions
- Maintain accessibility considerations
- Use semantic color names
- Support terminal compatibility

## 📚 Resources

- [Commander.js Documentation](https://github.com/tj/commander.js)
- [Inquirer.js Documentation](https://github.com/SBoudrias/Inquirer.js)
- [cli-table3 Documentation](https://github.com/cli-table/cli-table3)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ❓ Questions?

- Create an issue with the `question` label
- Start discussions in GitHub Discussions
- Check existing documentation and issues first

## 🙏 Recognition

Contributors will be recognized in:
- The README contributors section
- Release notes for significant contributions
- Special thanks in the project documentation

Thank you for helping make VibeBench CLI better! 🚀