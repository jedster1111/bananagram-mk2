import React from 'react';
import { createSquares } from './createSquares';
import { createVector, createVectorKey } from '../../utils/vector/vector';
import { render } from '@testing-library/react';
import { Grid } from './Grid';
import { Pieces, Piece } from '../../types';

describe('Grid', () => {
  describe('Grid', () => {
    const dimensions = createVector(5, 5);
    const defaultProps = {
      dimensions
    };
    it('should render an empty grid', () => {
      const { getByTestId } = render(<Grid {...defaultProps} />);

      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          const square = getByTestId(createVectorKey(x, y));
          expect(square.textContent).toBe('');
        }
      }
    });

    it('should render a grid with values passed in', () => {
      const pieces: Pieces = {
        [createVectorKey(0, 0)]: { id: '1', value: '0-0' },
        [createVectorKey(1, 2)]: {
          id: '2',
          value: '1-2'
        },
        [createVectorKey(3, 4)]: { id: '3', value: '3-4' }
      };

      const { getByTestId } = render(
        <Grid {...defaultProps} pieces={pieces} />
      );

      for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
          const vectorKey = createVectorKey(x, y);
          const square = getByTestId(vectorKey);
          const gridPiece = pieces[vectorKey] as Piece | undefined;

          expect(square.textContent).toBe((gridPiece && gridPiece.value) || '');
        }
      }
    });
  });

  describe('createSquares', () => {
    const dimension = 5;
    const dimensions = createVector(dimension, dimension);

    it('should create squares with the correct dimensions and pieces provided', () => {
      const pieces: Pieces = {
        [createVectorKey(0, 0)]: { id: '1', value: '0-0' },
        [createVectorKey(1, 2)]: { id: '2', value: '1-2' },
        [createVectorKey(3, 4)]: { id: '3', value: '3-4' }
      };

      const squares = createSquares(pieces, { '1': true }, dimensions);

      expect(squares.length).toBe(dimension);
      expect(squares[0].length).toBe(dimension);

      expect(squares[0][0]).toEqual({ piece: pieces['0-0'], isSelected: true });
      expect(squares[2][1]).toEqual({
        piece: pieces['1-2'],
        isSelected: false
      });
      expect(squares[4][3]).toEqual({
        piece: pieces['3-4'],
        isSelected: false
      });
    });
  });
});
