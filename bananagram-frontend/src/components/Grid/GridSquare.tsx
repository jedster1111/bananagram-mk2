import React, { FC } from 'react';
import { SquareData } from './gridTypes';
import styled from 'styled-components';
import { Vector, vectorToKey } from '../../utils/vector/vector';

interface GridSquareProps {
  squareData: SquareData;
  position: Vector;
}

const StyledGridSquare = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: solid black;
  border-width: ${({ isSelected }) => (isSelected ? '3px' : '1px')};
  flex: 1;
`;

export const GridSquare: FC<GridSquareProps> = ({ squareData, position }) => (
  <StyledGridSquare
    data-testid={vectorToKey(position)}
    isSelected={Boolean(squareData.isSelected)}
  >
    {squareData.piece && squareData.piece.value}
  </StyledGridSquare>
);
