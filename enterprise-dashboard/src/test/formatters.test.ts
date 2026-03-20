import {
  formatCurrency, formatNumber, formatPercent, formatBytes,
} from '@utils/formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats full dollar amount', () => {
      expect(formatCurrency(1234567)).toBe('$1,234,567');
    });
    it('formats compact thousands', () => {
      expect(formatCurrency(45000, 'USD', true)).toBe('$45.0K');
    });
    it('formats compact millions', () => {
      expect(formatCurrency(2500000, 'USD', true)).toBe('$2.5M');
    });
    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0');
    });
  });

  describe('formatNumber', () => {
    it('formats a regular number', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });
    it('formats compact K', () => {
      expect(formatNumber(5400, true)).toBe('5.4K');
    });
    it('formats compact M', () => {
      expect(formatNumber(1_200_000, true)).toBe('1.2M');
    });
  });

  describe('formatPercent', () => {
    it('adds + for positive values', () => {
      expect(formatPercent(12.04)).toBe('+12.04%');
    });
    it('keeps - for negative values', () => {
      expect(formatPercent(-6.61)).toBe('-6.61%');
    });
    it('respects decimals param', () => {
      expect(formatPercent(3.14159, 1)).toBe('+3.1%');
    });
  });

  describe('formatBytes', () => {
    it('handles 0', () => {
      expect(formatBytes(0)).toBe('0 B');
    });
    it('formats KB', () => {
      expect(formatBytes(1024)).toBe('1 KB');
    });
    it('formats MB', () => {
      expect(formatBytes(1048576)).toBe('1 MB');
    });
    it('formats GB', () => {
      expect(formatBytes(1073741824)).toBe('1 GB');
    });
  });
});
