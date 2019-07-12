import React, { MouseEvent } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createVector, createVectorKey } from 'simple-vectors';

import { Pieces } from '../../types';
import { getSquareIndex } from '../../utils/test/getSquareIndex';

import { Grid } from './Grid';

const cmdClickOptions: Partial<MouseEvent> = { metaKey: true };

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
      const { getAllByTestId } = render(
        <Grid {...defaultProps} pieces={undefined} />
      );

      const squares = getAllByTestId('grid-square');
      squares.forEach(square => {
        expect(square).toHaveTextContent(/^$/);
      });

      expect(squares).toHaveLength(dimensions.getArea());
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

      const { getAllByTestId } = render(
        <Grid {...defaultProps} pieces={pieces} />
      );

      const squares = getAllByTestId('grid-square');

      expect(squares[getSquareIndex(0, 0, dimensions.x)]).toHaveTextContent(
        '0-0'
      );
      expect(squares[getSquareIndex(1, 2, dimensions.x)]).toHaveTextContent(
        '1-2'
      );
      expect(squares[getSquareIndex(3, 4, dimensions.x)]).toHaveTextContent(
        '3-4'
      );
    });

    describe('handleClickingSquare', () => {
      it('should select a square if I click on it. If I click on a second, should deselect the first', () => {
        const { getByText } = render(<Grid {...defaultProps} />);

        const firstSquareToClick = getByText('0-0');
        const secondSquareToClick = getByText('1-2');

        fireEvent.click(firstSquareToClick);

        assertSquareIsSelected(firstSquareToClick);
        assertSquareIsNotSelected(secondSquareToClick);

        fireEvent.click(secondSquareToClick);

        assertSquareIsNotSelected(firstSquareToClick);
        assertSquareIsSelected(secondSquareToClick);
      });

      it("should allow me to select multiple squares by holding the 'CMD' button", () => {
        const { getByText } = render(<Grid {...defaultProps} />);

        const firstSquareToClick = getByText('0-0');
        const secondSquareToClick = getByText('1-2');

        fireEvent.click(firstSquareToClick);
        // Holding down the CMD key, click again
        fireEvent.click(secondSquareToClick, cmdClickOptions);

        assertSquareIsSelected(firstSquareToClick);
        assertSquareIsSelected(secondSquareToClick);
      });

      describe('clicking an empty square', () => {
        it("should deselect squares if 'CMD' is NOT pressed", () => {
          const { getByText, getAllByTestId } = render(
            <Grid {...defaultProps} />
          );

          const squares = getAllByTestId('grid-square');

          const firstSquareToClick = getByText('0-0');
          const emptySquareToClick =
            squares[getSquareIndex(0, 1, dimensions.x)];

          fireEvent.click(firstSquareToClick);
          fireEvent.click(emptySquareToClick);

          assertSquareIsNotSelected(firstSquareToClick);
          assertSquareIsNotSelected(emptySquareToClick);
        });

        it("should NOT deselect squares if 'CMD' is pressed", () => {
          const { getByText, getAllByTestId } = render(
            <Grid {...defaultProps} />
          );

          const squares = getAllByTestId('grid-square');

          const firstSquareToClick = getByText('0-0');
          const emptySquareToClick =
            squares[getSquareIndex(0, 1, dimensions.x)];

          fireEvent.click(firstSquareToClick);
          fireEvent.click(emptySquareToClick, cmdClickOptions);
          assertSquareIsSelected(firstSquareToClick);
          assertSquareIsNotSelected(emptySquareToClick);
        });
      });

      it('should deselect a selected square if I click while CMD is pressed', () => {
        const { getByText } = render(<Grid {...defaultProps} />);

        const firstSquareToClick = getByText('0-0');
        const secondSquareToClick = getByText('1-2');

        fireEvent.click(firstSquareToClick);
        fireEvent.click(secondSquareToClick, cmdClickOptions);
        fireEvent.click(secondSquareToClick, cmdClickOptions);

        assertSquareIsSelected(firstSquareToClick);
        assertSquareIsNotSelected(secondSquareToClick);
      });
    });
  });
});

function assertSquareIsNotSelected(squareToClick: HTMLElement): void {
  expect(squareToClick).toHaveStyleRule('outline', 'none');
}

function assertSquareIsSelected(squareToClick: HTMLElement): void {
  expect(squareToClick).toHaveStyleRule('outline', '3px solid black');
}
