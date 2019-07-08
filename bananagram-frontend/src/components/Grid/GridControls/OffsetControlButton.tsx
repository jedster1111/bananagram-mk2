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

interface OffsetControlButtonProps {
  direction: Directions;
  onClickChangeOffsetButton: (offsetChange: Vector) => void;
}

export const OffsetControlButton: FC<OffsetControlButtonProps> = props => {
  const arrow = arrowDirectionMap[props.direction];

  return (
    <OffsetControlContainer direction={props.direction}>
      <Button
        onClick={() =>
          props.onClickChangeOffsetButton(vectorDirectionMap[props.direction])
        }
      >
        {arrow}
      </Button>
    </OffsetControlContainer>
  );
};
