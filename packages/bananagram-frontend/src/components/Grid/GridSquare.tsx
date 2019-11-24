import React, { FC, KeyboardEvent, memo, MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

import { SquareData } from './gridTypes';

interface GridSquareProps {
  squareData: SquareData;
  handleSquareClick: (
    id: string | undefined,
    isSelected: boolean,
    isCmdPressed: boolean
  ) => void;
}

interface StyledGridSquareProps {
  isSelected: boolean;
  isPiece: boolean;
}

const StyledGridSquare = styled.div<StyledGridSquareProps>`
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

  &:focus {
    outline: 1px dotted #212121;
    outline-width: ${({ isSelected }) => (isSelected ? '8px' : 'initial')};
  }
`;

const GridSquare: FC<GridSquareProps> = ({ squareData, handleSquareClick }) => {
  const piece = squareData.piece;
  const value: ReactNode = squareData.piece?.value;
  const handleSquareSelect = (e: MouseEvent | KeyboardEvent): void => {
    handleSquareClick(piece?.id, squareData.isSelected, e.shiftKey);
  };
  const isPiece = Boolean(squareData.piece);

  return (
    <StyledGridSquare
      data-testid={'grid-square'}
      isSelected={Boolean(squareData.isSelected)}
      onClick={handleSquareSelect}
      onKeyDown={e => e.key === 'Enter' && handleSquareSelect(e)}
      isPiece={isPiece}
      tabIndex={isPiece ? 0 : -1}
    >
      {value}
    </StyledGridSquare>
  );
};

export const MemoGridSquare: FC<GridSquareProps> = memo(GridSquare);
