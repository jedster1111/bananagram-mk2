import { createVector, vectorToKey, keyToVector } from './vector';

describe('Vector', () => {
  describe('createVector', () => {
    it('should create a vector', () => {
      expect(createVector(1, 1)).toEqual({ x: 1, y: 1 });
    });
  });

  describe('vectorToString', () => {
    it('should return a string representation of a vector', () => {
      expect(vectorToKey({ x: 1, y: 2 })).toBe(`1-2`);
    });
  });

  describe('stringToVector', () => {
    it('should return a vector obtained from a string', () => {
      expect(keyToVector('1-2')).toEqual({ x: 1, y: 2 });
    });

    it('should thrown an error if string is not in the format ${x}-${y}', () => {
      expect(() => keyToVector('fail-2')).toThrow();
    });
  });
});
