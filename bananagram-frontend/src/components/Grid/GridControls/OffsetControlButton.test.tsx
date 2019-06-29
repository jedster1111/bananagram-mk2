import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OffsetControlButton } from './OffsetControlButton';
import { Directions } from '../../../types';
import { createVector, Vector } from '../../../utils/vector/vector';

describe('OffsetControlButton', () => {
  describe.each<[Directions, string, Vector]>([
    ['up', '\u2191', createVector(0, -1)],
    ['right', '\u2192', createVector(1, 0)],
    ['down', '\u2193', createVector(0, 1)],
    ['left', '\u2190', createVector(-1, 0)]
  ])('When the direction is %s', (direction, arrow, vector) => {
    it(`should have text ${arrow}`, () => {
      const { getByText } = render(
        <OffsetControlButton
          direction={direction}
          onClickChangeOffsetButton={jest.fn()}
        />
      );
      getByText(arrow);
    });

    it(`should call onClick with ${JSON.stringify(vector)}`, () => {
      const mockOnClick = jest.fn();
      const { getByText } = render(
        <OffsetControlButton
          direction={direction}
          onClickChangeOffsetButton={mockOnClick}
        />
      );
      const button = getByText(arrow);
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledWith(vector);
    });
  });
});
