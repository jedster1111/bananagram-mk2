import { createVector, createVectorKey } from 'simple-vectors';

import { Pieces } from '../../types';

import { createSquares } from './createSquares';

describe('createSquares', () => {
  const dimension = 5;
  const dimensions = createVector(dimension, dimension);
  const offset = createVector(0, 0);

  it('should create squares with the correct dimensions and pieces provided', () => {
    const pieces: Pieces = {
      [createVectorKey(0, 0)]: { id: '1', value: '0-0' },
      [createVectorKey(1, 2)]: { id: '2', value: '1-2' },
      [createVectorKey(3, 4)]: { id: '3', value: '3-4' }
    };

    const squares = createSquares(
      pieces,
      { '1': true },
      dimensions,
      offset,
      false
    );

    expect(squares.length).toBe(dimension);
    expect(squares[0].length).toBe(dimension);

    expect(squares[0][0]).toEqual({ piece: pieces['0,0'], isSelected: true });
    expect(squares[2][1]).toEqual({
      piece: pieces['1,2'],
      isSelected: false
    });
    expect(squares[4][3]).toEqual({
      piece: pieces['3,4'],
      isSelected: false
    });
  });
});
