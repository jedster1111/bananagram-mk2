import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GridPage } from './GridPage';
import { getVectorArea, createVector } from '../../utils/vector/vector';

describe('GridPage', () => {
  describe('handleZoom', () => {
    it('should zoom IN when I press the + button', () => {
      const { getAllByTestId, getByText } = render(<GridPage />);

      const squares = getAllByTestId('grid-square');
      expect(squares).toHaveLength(getVectorArea(createVector(10, 10)));

      const zoomInButton = getByText(/^\+$/);
      fireEvent.click(zoomInButton);

      const squaresAfterClick = getAllByTestId('grid-square');
      expect(squaresAfterClick).toHaveLength(getVectorArea(createVector(9, 9)));
    });

    it('should zoom OUT when I press the - button', () => {
      const { getAllByTestId, getByText } = render(<GridPage />);

      const squares = getAllByTestId('grid-square');
      expect(squares).toHaveLength(getVectorArea(createVector(10, 10)));

      const zoomInButton = getByText(/^-$/);
      fireEvent.click(zoomInButton);

      const squaresAfterClick = getAllByTestId('grid-square');
      expect(squaresAfterClick).toHaveLength(
        getVectorArea(createVector(11, 11))
      );
    });

    it('should stop you from zooming further in than a 3x3 square', () => {
      const initialDimensions = createVector(3, 3);
      const { getAllByTestId, getByText } = render(
        <GridPage initialGridDimensions={initialDimensions} />
      );

      const squares = getAllByTestId('grid-square');
      expect(squares).toHaveLength(getVectorArea(initialDimensions));

      const zoomInButton = getByText(/^\+$/);
      fireEvent.click(zoomInButton);

      const squaresAfterClick = getAllByTestId('grid-square');
      expect(squaresAfterClick).toHaveLength(getVectorArea(initialDimensions));
    });

    it('should stop you from zooming out further than a 35x35 square', () => {
      const initialDimensions = createVector(35, 35);
      const { getAllByTestId, getByText } = render(
        <GridPage initialGridDimensions={initialDimensions} />
      );

      const zoomOutButton = getByText(/^-$/);
      fireEvent.click(zoomOutButton);

      const squaresAfterClick = getAllByTestId('grid-square');
      expect(squaresAfterClick).toHaveLength(getVectorArea(initialDimensions));
    });
  });
});
