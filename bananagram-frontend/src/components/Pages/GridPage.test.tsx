import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createVector, createVectorKey } from 'simple-vectors';

import { arrowDirectionMap } from '../Grid/GridControls/OffsetControlButton';
import { getSquareIndex } from '../../utils/test/getSquareIndex';

import { GridPage } from './GridPage';

describe('GridPage', () => {
  describe('GridControls', () => {
    it('should zoom IN when I press the + button', () => {
      const { getByTestId, getByText } = render(<GridPage />);

      const grid = getByTestId('grid');
      expect(grid).toHaveAttribute('data-dimensions', '10,10');

      const zoomInButton = getByText(/^\+$/);
      fireEvent.click(zoomInButton);

      const gridAfterClick = getByTestId('grid');
      expect(gridAfterClick).toHaveAttribute('data-dimensions', '9,9');
    });

    it.only('should zoom OUT when I press the - button', () => {
      const { getByTestId, getByText } = render(<GridPage />);

      const grid = getByTestId('grid');
      expect(grid).toHaveAttribute('data-dimensions', '10,10');

      const zoomOutButton = getByText(/^-$/);
      fireEvent.click(zoomOutButton);

      const gridAfterClick = getByTestId('grid');
      expect(gridAfterClick).toHaveAttribute('data-dimensions', '11,11');
    });

    it('should stop you from zooming further in than a 3x3 square', () => {
      const initialDimensions = createVector(3, 3);
      const { getByTestId, getByText } = render(
        <GridPage initialGridDimensions={initialDimensions} />
      );

      const zoomInButton = getByText(/^\+$/);
      fireEvent.click(zoomInButton);

      const gridAfterClick = getByTestId('grid');
      expect(gridAfterClick).toHaveAttribute('data-dimensions', '3,3');
    });

    it('should stop you from zooming out further than a 35x35 square', () => {
      const initialDimensions = createVector(35, 35);
      const { getByTestId, getByText } = render(
        <GridPage initialGridDimensions={initialDimensions} />
      );

      const zoomOutButton = getByText(/^-$/);
      fireEvent.click(zoomOutButton);

      const gridAfterClick = getByTestId('grid');
      expect(gridAfterClick).toHaveAttribute('data-dimensions', '35,35');
    });

    it('on save restore value set to save value', () => {
      const { getByText } = render(<GridPage />);

      const saveButton = getByText(/^Save/);
      fireEvent.click(saveButton);

      const restoreButton = getByText(/^Restore/);
      expect(restoreButton).toHaveTextContent(/0, 0/);
      expect(restoreButton).toHaveTextContent(/10x10/);
    });
  });

  describe('offset', () => {
    it('clicking on the right arrow button should move the grid one square to the right', () => {
      const { getAllByTestId, getByText } = render(
        <GridPage
          pieces={{ [createVectorKey(0, 0)]: { id: '1', value: 'someValue' } }}
          initialGridDimensions={createVector(5, 5)}
        />
      );

      fireEvent.click(getByText(arrowDirectionMap.right));
      const squares = getAllByTestId('grid-square');

      expect(squares[getSquareIndex(1, 0, 5)]).toHaveTextContent('someValue');
    });
  });
});
