import React, { FC, memo, MouseEvent } from 'react';
import { SquareData } from './gridTypes';
import styled from 'styled-components';

interface GridSquareProps {
  squareData: SquareData;
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

  box-sizing: border-box;
  border: solid black 1px;
  outline: ${({ isSelected }) => (isSelected ? '3px solid black' : 'none')};
  user-select: none;
  overflow: hidden;

  cursor: ${({ isPiece }) => (isPiece ? 'pointer' : 'auto')};
`;

const GridSquare: FC<GridSquareProps> = ({ squareData, handleSquareClick }) => {
  const piece = squareData.piece;
  const value = squareData.piece && squareData.piece.value;
  const handleClick = (e: MouseEvent): void =>
    handleSquareClick(piece && piece.id, squareData.isSelected, e.metaKey);

  return (
    <StyledGridSquare
      data-testid={'grid-square'}
      isSelected={Boolean(squareData.isSelected)}
      onClick={handleClick}
      isPiece={Boolean(squareData.piece)}
    >
      {value}
    </StyledGridSquare>
  );
};

export const MemoGridSquare: FC<GridSquareProps> = memo(GridSquare);
