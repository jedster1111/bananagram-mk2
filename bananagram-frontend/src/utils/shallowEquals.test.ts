import shallowEquals from './shallowEquals';

describe('shallowEquals', () => {
  it('should return true if the two objects share the same reference', () => {
    const someObject = {};
    expect(shallowEquals(someObject, someObject)).toBe(true);
  });

  it('should return false if either objects are false', () => {
    expect(shallowEquals({}, undefined)).toBe(false);
    expect(shallowEquals(undefined, {})).toBe(false);
  });

  it('should return false if objects have different number of properties', () => {
    expect(shallowEquals({ a: 'a', b: 'b' }, { a: 'a' })).toBe(false);
  });

  it('should return true if an object is shallowly equal', () => {
    const someObject = { testing: 'testing' };
    expect(
      shallowEquals(
        { a: 'a', b: 'b', someObject },
        { a: 'a', b: 'b', someObject }
      )
    ).toBe(true);
  });

  it("should return false if an object's properties have different values", () => {
    expect(shallowEquals({ a: 'a', b: 'b' }, { a: 'a', b: 'whoops' })).toBe(
      false
    );
  });
});
