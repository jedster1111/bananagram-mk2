import React from 'react';
import { render } from '@testing-library/react';
import { GridSquare } from './GridSquare';
import { createVector, vectorToKey } from '../../utils/vector/vector';

describe('GridSquare', () => {
  const position = createVector(0, 0);
  const positionKey = vectorToKey(position);
  const defaultProps = {
    position
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

  describe('border-width', () => {
    it('should be 3px when selected', () => {
      const { getByTestId } = render(
        <GridSquare {...defaultProps} squareData={{ isSelected: true }} />
      );

      expect(getByTestId(positionKey)).toHaveStyleRule('border-width', '3px');
    });

    it('should be 1px when NOT selected', () => {
      const { getByTestId } = render(
        <GridSquare {...defaultProps} squareData={{ isSelected: false }} />
      );

      expect(getByTestId(positionKey)).toHaveStyleRule('border-width', '1px');
    });
  });
});
