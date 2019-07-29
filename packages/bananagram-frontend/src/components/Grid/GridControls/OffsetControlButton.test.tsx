import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createVector, Vector } from 'simple-vectors';

import { Directions } from '../../../types';

import { OffsetControlButton } from './OffsetControlButton';

describe('OffsetControlButton', () => {
  describe.each<[Directions, string, Vector]>([
    ['up', '\u2191', createVector(0, -1)],
    ['right', '\u2192', createVector(1, 0)],
    ['down', '\u2193', createVector(0, 1)],
    ['left', '\u2190', createVector(-1, 0)],
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

      const { x, y } = mockOnClick.mock.calls[0][0];
      expect({ x, y }).toEqual({ x: vector.x, y: vector.y });
    });
  });
});
