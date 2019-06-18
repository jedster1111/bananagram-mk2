import React, { FC, MouseEvent } from 'react';
import { SquareData } from './gridTypes';
import styled from 'styled-components';
import { Vector, vectorToKey } from '../../utils/vector/vector';

interface GridSquareProps {
  squareData: SquareData;
  position: Vector;
  handleSquareClick: (
    id: string | undefined,
    isSelected: boolean,
    isCmdPressed: boolean
  ) => void;
}

const StyledGridSquare = styled.div<{ isSelected: boolean; isPiece: boolean }>`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border: solid black 1px;
  outline: ${({ isSelected }) => (isSelected ? '3px solid black' : 'none')};
  user-select: none;

  cursor: ${({ isPiece }) => (isPiece ? 'pointer' : 'auto')};
`;

export const GridSquare: FC<GridSquareProps> = ({
  squareData,
  position,
  handleSquareClick
}) => {
  const piece = squareData.piece;
  const handleClick = (e: MouseEvent): void =>
    handleSquareClick(piece && piece.id, squareData.isSelected, e.metaKey);

  const value = squareData.piece && squareData.piece.value;

  return (
    <StyledGridSquare
      data-testid={vectorToKey(position)}
      isSelected={Boolean(squareData.isSelected)}
      onClick={handleClick}
      isPiece={Boolean(squareData.piece)}
    >
      {value}
    </StyledGridSquare>
  );
};
