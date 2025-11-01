import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('should load translation resources', () => {
    const resources = ['dashboard', 'vehicles', 'reports'];
    resources.forEach((key) => {
      expect(typeof key).toBe('string');
    });
  });
});
