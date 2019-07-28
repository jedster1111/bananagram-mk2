import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createVector } from 'simple-vectors';

import { GridControls } from './GridControls';

describe('GridControls', () => {
  const onZoomIn = jest.fn();
  const onSave = jest.fn();
  const onHome = jest.fn();
  const onRestore = jest.fn();
  const onZoomOut = jest.fn();

  const defaultProps = {
    onZoomIn,
    onSave,
    onHome,
    onRestore,
    onZoomOut,
    offset: createVector(0, 1),
    dimensions: createVector(2, 3),
    offsetSaved: createVector(4, 5),
    dimensionsSaved: createVector(6, 7),
    initialOffset: createVector(8, 9),
    initialGridDimensions: createVector(10, 11),
  };

  describe('Home Button', () => {
    it('should display the initial offset and dimensions', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const homeButton = getByText(/^Home/);

      expect(homeButton).toHaveTextContent(/8, 9/);
      expect(homeButton).toHaveTextContent(/10x11/);
    });

    it('should call onHome when clicked', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const homeButton = getByText(/^Home/);

      fireEvent.click(homeButton);

      expect(onHome).toBeCalled();
    });
  });
});
