import React, { FC } from 'react';
import { Button } from '../../common/Button';
import styled from 'styled-components';
import { Directions } from '../../../types';
import { Vector, createVector } from 'simple-vectors';

export const arrowDirectionMap: { [key in Directions]: string } = {
  up: '\u2191',
  right: '\u2192',
  down: '\u2193',
  left: '\u2190'
};

const vectorDirectionMap: { [key in Directions]: Vector } = {
  up: createVector(0, -1),
  right: createVector(1, 0),
  down: createVector(0, 1),
  left: createVector(-1, 0)
};

const OffsetControlContainer = styled.div<{ direction: Directions }>`
  grid-area: ${({ direction }) => `${direction}-arrow`};
`;

export const OffsetControlButton: FC<{
  direction: Directions;
  onClickChangeOffsetButton: (offsetChange: Vector) => void;
}> = ({ direction, onClickChangeOffsetButton }) => {
  const arrow = arrowDirectionMap[direction];

  return (
    <OffsetControlContainer direction={direction}>
      <Button
        onClick={() => onClickChangeOffsetButton(vectorDirectionMap[direction])}
      >
        {arrow}
      </Button>
    </OffsetControlContainer>
  );
};
