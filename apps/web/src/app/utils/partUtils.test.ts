import { buildSteps, sampleComponents } from './partUtils';

describe('partUtils', () => {
  describe('buildSteps', () => {
    it('exports buildSteps array', () => {
      expect(buildSteps).toBeDefined();
      expect(Array.isArray(buildSteps)).toBe(true);
      expect(buildSteps.length).toBe(5);
    });

    it('has expected build step names', () => {
      const stepNames = buildSteps.map(step => step.name);
      expect(stepNames).toContain('Frame');
      expect(stepNames).toContain('Groupset');
      expect(stepNames).toContain('Wheels');
    });

    it('all steps have required properties', () => {
      buildSteps.forEach(step => {
        expect(step).toHaveProperty('id');
        expect(step).toHaveProperty('name');
        expect(step).toHaveProperty('description');
        expect(step).toHaveProperty('required');
      });
    });
  });

  describe('sampleComponents', () => {
    it('exports sampleComponents object', () => {
      expect(sampleComponents).toBeDefined();
      expect(typeof sampleComponents).toBe('object');
    });

    it('has components for each build step', () => {
      buildSteps.forEach(step => {
        expect(sampleComponents).toHaveProperty(step.id);
        expect(Array.isArray(sampleComponents[step.id])).toBe(true);
      });
    });

    it('all components have required properties', () => {
      Object.values(sampleComponents).forEach(components => {
        components.forEach(component => {
          expect(component).toHaveProperty('id');
          expect(component).toHaveProperty('name');
          expect(component).toHaveProperty('price');
          expect(component).toHaveProperty('brand');
        });
      });
    });
  });
});