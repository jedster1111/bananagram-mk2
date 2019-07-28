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

  describe('+ Button', () => {
    it('+ button should be avaliable', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const plusButton = getByText(/^\+$/);

      expect(plusButton).toHaveTextContent(/\+/);
    });

    it('should call onZoomIn when clicked', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const plusButton = getByText(/^\+$/);

      fireEvent.click(plusButton);

      expect(onZoomIn).toBeCalled();
    });
  });
  describe('Save Button', () => {
    it('should display the offset and dimensions', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const saveButton = getByText(/^Save/);

      expect(saveButton).toHaveTextContent(/0, 1/);
      expect(saveButton).toHaveTextContent(/2x3/);
    });

    it('should call onSave when clicked', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const saveButton = getByText(/^Save/);

      fireEvent.click(saveButton);

      expect(onSave).toBeCalled();
    });
  });
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
  describe('Restore Button', () => {
    it('should display the saved offset and dimensions', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const restoreButton = getByText(/^Restore/);

      expect(restoreButton).toHaveTextContent(/4, 5/);
      expect(restoreButton).toHaveTextContent(/6x7/);
    });

    it('should call onHome when clicked', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const restoreButton = getByText(/^Restore/);

      fireEvent.click(restoreButton);

      expect(onRestore).toBeCalled();
    });
  });
  describe('- Button', () => {
    it('- button should be avaliable', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const minusButton = getByText(/^-/);

      expect(minusButton).toHaveTextContent(/-/);
    });

    it('should call onZoomOut when clicked', () => {
      const { getByText } = render(<GridControls {...defaultProps} />);
      const minusButton = getByText(/^-/);

      fireEvent.click(minusButton);

      expect(onZoomOut).toBeCalled();
    });
  });
});
