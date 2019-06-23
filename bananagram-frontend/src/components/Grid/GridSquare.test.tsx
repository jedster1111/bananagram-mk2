import React from 'react';
import { render } from '@testing-library/react';
import { GridSquare } from './GridSquare';
import { createVector, vectorToKey } from '../../utils/vector/vector';

describe('GridSquare', () => {
  const position = createVector(0, 0);
  const handleSquareClick = jest.fn();
  const positionKey = vectorToKey(position);
  const defaultProps = {
    position,
    handleSquareClick
  };

  describe('value', () => {
    it('should render the text value passed', () => {
      const { container } = render(
        <GridSquare
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
      const { getByTestId } = render(
        <GridSquare
          {...defaultProps}
          squareData={{
            piece: { id: '1', value: <div>someValue</div> },
            isSelected: false
          }}
        />
      );

      expect(getByTestId(positionKey).innerHTML).toEqual(
        '<div>someValue</div>'
      );
    });
  });

  describe('outline', () => {
    it("should be '3px solid black' when selected", () => {
      const { getByTestId } = render(
        <GridSquare {...defaultProps} squareData={{ isSelected: true }} />
      );

      expect(getByTestId(positionKey)).toHaveStyleRule(
        'outline',
        '3px solid black'
      );
    });

    it("should be 'none' when NOT selected", () => {
      const { getByTestId } = render(
        <GridSquare {...defaultProps} squareData={{ isSelected: false }} />
      );

      expect(getByTestId(positionKey)).toHaveStyleRule('outline', 'none');
    });
  });
});
