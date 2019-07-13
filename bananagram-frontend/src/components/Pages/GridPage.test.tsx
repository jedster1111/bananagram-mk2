import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createVector, createVectorKey } from 'simple-vectors';

import { arrowDirectionMap } from '../Grid/GridControls/OffsetControlButton';
import { getSquareIndex } from '../../utils/test/getSquareIndex';

import { GridPage } from './GridPage';

describe('GridPage', () => {
  describe('GridControls', () => {
    it('should zoom IN when I press the + button', () => {
      const { getAllByTestId, getByText } = render(<GridPage />);

      const squares = getAllByTestId('grid-square');
      expect(squares).toHaveLength(createVector(10, 10).getArea());

      const zoomInButton = getByText(/^\+$/);
      fireEvent.click(zoomInButton);

      const squaresAfterClick = getAllByTestId('grid-square');
      expect(squaresAfterClick).toHaveLength(createVector(9, 9).getArea());
    });

    it('should zoom OUT when I press the - button', () => {
      const { getAllByTestId, getByText } = render(<GridPage />);

      const squares = getAllByTestId('grid-square');
      expect(squares).toHaveLength(createVector(10, 10).getArea());

      const zoomInButton = getByText(/^-$/);
      fireEvent.click(zoomInButton);

      const squaresAfterClick = getAllByTestId('grid-square');
      expect(squaresAfterClick).toHaveLength(createVector(11, 11).getArea());
    });

    it('should stop you from zooming further in than a 3x3 square', () => {
      const initialDimensions = createVector(3, 3);
      const { getAllByTestId, getByText } = render(
        <GridPage initialGridDimensions={initialDimensions} />
      );

      const squares = getAllByTestId('grid-square');
      expect(squares).toHaveLength(initialDimensions.getArea());

      const zoomInButton = getByText(/^\+$/);
      fireEvent.click(zoomInButton);

      const squaresAfterClick = getAllByTestId('grid-square');
      expect(squaresAfterClick).toHaveLength(initialDimensions.getArea());
    });

    it('should stop you from zooming out further than a 35x35 square', () => {
      const initialDimensions = createVector(35, 35);
      const { getAllByTestId, getByText } = render(
        <GridPage initialGridDimensions={initialDimensions} />
      );

      const zoomOutButton = getByText(/^-$/);
      fireEvent.click(zoomOutButton);

      const squaresAfterClick = getAllByTestId('grid-square');
      expect(squaresAfterClick).toHaveLength(initialDimensions.getArea());
    });

    it('should render the current offset and dimension', () => {
      const { getByText } = render(<GridPage />);

      getByText('0, 0');
      getByText('10x10', { exact: false });
    });

    it('home button should reset camera 0,0 dimension 10,10', () => {
      const { getByText } = render(<GridPage />);

      const zoomOutButton = getByText(/^-$/);
      fireEvent.click(zoomOutButton);

      getByText('0, 0');
      getByText('11x11', { exact: false });

      fireEvent.click(getByText(arrowDirectionMap.right));

      getByText('1, 0');
      getByText('11x11', { exact: false });

      const homeButton = getByText(/^Home$/);
      fireEvent.click(homeButton);

      getByText('0, 0');
      getByText('10x10', { exact: false });
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
