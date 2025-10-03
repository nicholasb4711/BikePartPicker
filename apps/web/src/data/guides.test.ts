import { getGuideBySlug, getAllGuides } from './guides';

describe('guides data utilities', () => {
  describe('getAllGuides', () => {
    it('returns all guides', () => {
      const allGuides = getAllGuides();
      expect(allGuides).toBeDefined();
      expect(Array.isArray(allGuides)).toBe(true);
      expect(allGuides.length).toBeGreaterThan(0);
    });

    it('returns guides with required properties', () => {
      const allGuides = getAllGuides();
      
      allGuides.forEach(guide => {
        expect(guide).toHaveProperty('id');
        expect(guide).toHaveProperty('title');
        expect(guide).toHaveProperty('description');
        expect(guide).toHaveProperty('category');
        expect(guide).toHaveProperty('sections');
      });
    });
  });

  describe('getGuideBySlug', () => {
    it('returns guide when slug exists', () => {
      const guide = getGuideBySlug('drivetrain');
      expect(guide).toBeDefined();
      expect(guide?.id).toBe('drivetrain');
    });

    it('returns undefined when slug does not exist', () => {
      const guide = getGuideBySlug('non-existent-guide');
      expect(guide).toBeUndefined();
    });

    it('returns undefined for empty string', () => {
      const guide = getGuideBySlug('');
      expect(guide).toBeUndefined();
    });
  });
});