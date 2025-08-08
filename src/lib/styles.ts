import chalk from 'chalk';

// Color Palette
export const colors = {
  primary: '#FFA500',    // Orange - rankings, highlights, selections
  success: '#00FF00',    // Green - positive actions, fire votes  
  warning: '#FFFF00',    // Yellow - mid votes, warnings
  error: '#FF0000',      // Red - errors, cursed votes
  muted: '#808080',      // Gray - secondary text, separators
  text: '#FFFFFF',       // White - primary content
} as const;

// Styled text functions
export const text = {
  primary: (str: string) => chalk.hex(colors.primary)(str),
  success: (str: string) => chalk.hex(colors.success)(str),
  warning: (str: string) => chalk.hex(colors.warning)(str),
  error: (str: string) => chalk.hex(colors.error)(str),
  muted: (str: string) => chalk.hex(colors.muted)(str),
  normal: (str: string) => chalk.hex(colors.text)(str),
} as const;

// Typography styles
export const typography = {
  header: (str: string) => text.primary(str),
  subheader: (str: string) => text.normal(str),
  data: (str: string) => text.normal(str),
  meta: (str: string) => text.muted(str),
  highlight: (str: string) => text.primary(str),
} as const;

// Vote type styling
export const voteStyles = {
  fire: (str: string) => text.success(str),
  mid: (str: string) => text.warning(str), 
  cursed: (str: string) => text.error(str),
} as const;

// Message styles
export const messages = {
  success: (str: string) => text.success(str),
  error: (str: string) => text.error(str),
  warning: (str: string) => text.warning(str),
  info: (str: string) => text.primary(str),
} as const;

// Table configuration for cli-table3
export const tableConfig = {
  style: {
    head: [] as string[],    // No colors in head (we'll style manually)
    border: [] as string[],  // No colors in border
  },
  chars: {
    'top': '─', 'top-mid': '┬', 'top-left': '┌', 'top-right': '┐',
    'bottom': '─', 'bottom-mid': '┴', 'bottom-left': '└', 'bottom-right': '┘',
    'left': '│', 'left-mid': '├', 'mid': '─', 'mid-mid': '┼',
    'right': '│', 'right-mid': '┤', 'middle': '│'
  }
};

// Interactive prompt styling
export const promptStyles = {
  prefix: text.primary('►'),
  selection: text.primary,
  message: text.normal,
} as const;