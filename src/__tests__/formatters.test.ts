import { formatVoteType, formatVibeScore } from '../lib/formatters';
import { VoteType } from '../lib/types';

describe('formatters', () => {
  describe('formatVoteType', () => {
    it('should format fire vote correctly', () => {
      const result = formatVoteType('fire' as VoteType);
      expect(result).toContain('Fire');
    });

    it('should format mid vote correctly', () => {
      const result = formatVoteType('mid' as VoteType);
      expect(result).toContain('Mid');
    });

    it('should format cursed vote correctly', () => {
      const result = formatVoteType('cursed' as VoteType);
      expect(result).toContain('Cursed');
    });
  });

  describe('formatVibeScore', () => {
    it('should format high scores with appropriate styling', () => {
      const result = formatVibeScore(85.5);
      expect(result).toContain('85.5');
    });

    it('should format medium scores with appropriate styling', () => {
      const result = formatVibeScore(65.0);
      expect(result).toContain('65.0');
    });

    it('should format low scores with appropriate styling', () => {
      const result = formatVibeScore(25.3);
      expect(result).toContain('25.3');
    });

    it('should handle zero scores', () => {
      const result = formatVibeScore(0);
      expect(result).toContain('0.0');
    });
  });
});