import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createVector } from 'simple-vectors';

import { MemoGridSquare } from './GridSquare';

describe('GridSquare', () => {
  const position = createVector(0, 0);
  const handleSquareClick = jest.fn();
  const defaultProps = {
    position,
    handleSquareClick,
  };

  describe('value', () => {
    it('should render the text value passed', () => {
      const { container } = render(
        <MemoGridSquare
          {...defaultProps}
          squareData={{
            piece: { id: '1', value: 'someValue' },
            isSelected: false,
          }}
        />
      );

      expect(container.firstChild).toHaveTextContent(/^someValue$/);
    });

    it('should render a react node', () => {
      const { container } = render(
        <MemoGridSquare
          {...defaultProps}
          squareData={{
            piece: { id: '1', value: <div>someValue</div> },
            isSelected: false,
          }}
        />
      );

      expect(container.firstChild).toContainHTML('<div>someValue</div>');
    });
  });

  describe('outline', () => {
    it("should be '3px solid black' when selected", () => {
      const { getByTestId } = render(
        <MemoGridSquare {...defaultProps} squareData={{ isSelected: true }} />
      );

      expect(getByTestId('grid-square')).toHaveStyleRule(
        'outline',
        '3px solid black'
      );
    });

    it("should be 'none' when NOT selected", () => {
      const { getByTestId } = render(
        <MemoGridSquare {...defaultProps} squareData={{ isSelected: false }} />
      );

      expect(getByTestId('grid-square')).toHaveStyleRule('outline', 'none');
    });
  });

  describe('handleSquareClick', () => {
    const squareData = {
      piece: { id: '1', value: 'someValue' },
      isSelected: true,
    };
    const metaKey = true;

    it('should get called onClick', () => {
      const { getByTestId } = render(
        <MemoGridSquare {...defaultProps} squareData={squareData} />
      );

      const square = getByTestId('grid-square');

      fireEvent.click(square, { metaKey });

      expect(handleSquareClick).toHaveBeenCalledWith(
        squareData.piece.id,
        squareData.isSelected,
        metaKey
      );
    });
    it('should get called onClick', () => {
      const { getByTestId } = render(
        <MemoGridSquare {...defaultProps} squareData={squareData} />
      );

      const square = getByTestId('grid-square');

      fireEvent.click(square, { metaKey });

      expect(handleSquareClick).toHaveBeenCalledWith(
        squareData.piece.id,
        squareData.isSelected,
        metaKey
      );
    });

    it("should get called onKeyDown of the 'Enter' Key", () => {
      const { getByTestId } = render(
        <MemoGridSquare {...defaultProps} squareData={squareData} />
      );

      const square = getByTestId('grid-square');

      fireEvent.keyDown(square, { key: 'Enter', metaKey });

      expect(handleSquareClick).toHaveBeenCalledWith(
        squareData.piece.id,
        squareData.isSelected,
        metaKey
      );
    });
  });
});
