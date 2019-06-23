import {
  createVector,
  vectorToKey,
  keyToVector,
  addVectors,
  areVectorsEqual,
  isVectorSmallerThan,
  getVectorArea
} from './vector';

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

  describe('addVectors', () => {
    expect(addVectors(createVector(2, 3), createVector(4, 5))).toEqual({
      x: 6,
      y: 8
    });
  });

  describe('areVectorsEqual', () => {
    it('should return true if two vectors are equal', () => {
      expect(areVectorsEqual(createVector(3, 4), createVector(3, 4))).toBe(
        true
      );
    });

    it('should return false if two vectors are NOT equal', () => {
      expect(areVectorsEqual(createVector(3, 4), createVector(3, 5))).toBe(
        false
      );
    });
  });

  describe('isVectorSmallerThan', () => {
    it('should return true if either vectorA.x or vectorA.b is smaller than vectoB', () => {
      expect(isVectorSmallerThan(createVector(0, 3), createVector(2, 5))).toBe(
        true
      );
      expect(isVectorSmallerThan(createVector(3, 0), createVector(2, 5))).toBe(
        true
      );
    });
    it('should return false if both vectorA.x or vectorA.b are bigger than vectoB', () => {
      expect(isVectorSmallerThan(createVector(5, 5), createVector(3, 3))).toBe(
        false
      );
    });
  });

  describe('getVectorArea', () => {
    expect(getVectorArea(createVector(5, 10))).toBe(50);
  });
});
