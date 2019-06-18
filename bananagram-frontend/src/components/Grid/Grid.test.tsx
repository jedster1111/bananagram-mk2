import React from 'react';
import { createSquares } from './createSquares';
import { createVector, createVectorKey } from '../../utils/vector/vector';
import { render, fireEvent } from '@testing-library/react';
import { Grid } from './Grid';
import { Pieces, Piece } from '../../types';

describe('Grid', () => {
  describe('Grid', () => {
    const dimensions = createVector(5, 5);
    const defaultProps = {
      dimensions,
      pieces: {
        [createVectorKey(0, 0)]: { id: '1', value: '0-0' },
        [createVectorKey(1, 2)]: {
          id: '2',
          value: '1-2'
        },
        [createVectorKey(3, 4)]: { id: '3', value: '3-4' }
      }
    };

    it('should render an empty grid', () => {
      const { getByTestId } = render(
        <Grid {...defaultProps} pieces={undefined} />
      );

      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          const square = getByTestId(createVectorKey(x, y));
          expect(square.textContent).toBe('');
        }
      }
    });

    it('should render a grid with values passed in', () => {
      const { getByTestId } = render(<Grid {...defaultProps} />);

      for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
          const vectorKey = createVectorKey(x, y);
          const square = getByTestId(vectorKey);
          const gridPiece = defaultProps.pieces[vectorKey] as Piece | undefined;

          expect(square.textContent).toBe((gridPiece && gridPiece.value) || '');
        }
      }
    });

    describe('handleClickingSquare', () => {
      it('should select a square if I click on it. If I click on a second, should deselect the first', () => {
        const { getByText } = render(<Grid {...defaultProps} />);

        const firstSquareToClick = getByText('0-0');
        const secondSquareToClick = getByText('1-2');

        fireEvent.click(firstSquareToClick);

        expect(firstSquareToClick).toHaveStyleRule(
          'outline',
          '3px solid black'
        );
        expect(secondSquareToClick).toHaveStyleRule('outline', 'none');

        fireEvent.click(secondSquareToClick);

        expect(firstSquareToClick).toHaveStyleRule('outline', 'none');
        expect(secondSquareToClick).toHaveStyleRule(
          'outline',
          '3px solid black'
        );
      });

      it("should allow me to select multiple squares by holding the 'CMD' button", () => {
        const { getByText } = render(<Grid {...defaultProps} />);

        const firstSquareToClick = getByText('0-0');
        const secondSquareToClick = getByText('1-2');

        fireEvent.click(firstSquareToClick);

        expect(firstSquareToClick).toHaveStyleRule(
          'outline',
          '3px solid black'
        );
        expect(secondSquareToClick).toHaveStyleRule('outline', 'none');

        // Holding down the CMD key, click again
        fireEvent.click(secondSquareToClick, { metaKey: true });

        expect(firstSquareToClick).toHaveStyleRule(
          'outline',
          '3px solid black'
        );
        expect(secondSquareToClick).toHaveStyleRule(
          'outline',
          '3px solid black'
        );
      });

      describe('clicking an empty square', () => {
        it("should deselect squares if 'CMD' is NOT pressed", () => {
          const { getByTestId } = render(<Grid {...defaultProps} />);

          const firstSquareToClick = getByTestId('0-0');
          const secondSquareToClick = getByTestId('1-0');

          fireEvent.click(firstSquareToClick);

          expect(firstSquareToClick).toHaveStyleRule(
            'outline',
            '3px solid black'
          );
          expect(secondSquareToClick).toHaveStyleRule('outline', 'none');

          fireEvent.click(secondSquareToClick);
          expect(firstSquareToClick).toHaveStyleRule('outline', 'none');
          expect(secondSquareToClick).toHaveStyleRule('outline', 'none');
        });

        it("should NOT deselect squares if 'CMD' is pressed", () => {
          const { getByTestId } = render(<Grid {...defaultProps} />);

          const firstSquareToClick = getByTestId('0-0');
          const secondSquareToClick = getByTestId('1-0');

          fireEvent.click(firstSquareToClick);

          expect(firstSquareToClick).toHaveStyleRule(
            'outline',
            '3px solid black'
          );
          expect(secondSquareToClick).toHaveStyleRule('outline', 'none');

          fireEvent.click(secondSquareToClick, { metaKey: true });
          expect(firstSquareToClick).toHaveStyleRule(
            'outline',
            '3px solid black'
          );
          expect(secondSquareToClick).toHaveStyleRule('outline', 'none');
        });
      });

      it('should deselect a selected square if I click while CMD is pressed', () => {
        const { getByText } = render(<Grid {...defaultProps} />);

        const firstSquareToClick = getByText('0-0');
        const secondSquareToClick = getByText('1-2');

        fireEvent.click(firstSquareToClick);
        fireEvent.click(secondSquareToClick, { metaKey: true });

        expect(firstSquareToClick).toHaveStyleRule(
          'outline',
          '3px solid black'
        );
        expect(secondSquareToClick).toHaveStyleRule(
          'outline',
          '3px solid black'
        );

        fireEvent.click(secondSquareToClick, { metaKey: true });
        expect(firstSquareToClick).toHaveStyleRule(
          'outline',
          '3px solid black'
        );
        expect(secondSquareToClick).toHaveStyleRule('outline', 'none');
      });
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
