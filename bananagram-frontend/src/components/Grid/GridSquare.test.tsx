import React from 'react';
import { render } from '@testing-library/react';
import { MemoGridSquare } from './GridSquare';
import { createVector } from '../../utils/vector/vector';

describe('GridSquare', () => {
  const position = createVector(0, 0);
  const handleSquareClick = jest.fn();
  const defaultProps = {
    position,
    handleSquareClick
  };

  describe('value', () => {
    it('should render the text value passed', () => {
      const { container } = render(
        <MemoGridSquare
          {...defaultProps}
          squareData={{
            piece: { id: '1', value: 'someValue' },
            isSelected: false
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
            isSelected: false
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
});
