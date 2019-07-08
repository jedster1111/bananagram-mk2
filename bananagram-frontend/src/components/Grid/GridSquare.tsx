import React, { FC, memo, MouseEvent, KeyboardEvent } from 'react';
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
// eslint-disable-next-line
const StyledGridSquare = styled.div<{
  isSelected: boolean;
  isPiece: boolean;
}>`
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
    outline: 5px auto -webkit-focus-ring-color;
    outline-width: ${({ isSelected }) => (isSelected ? '8px' : 'initial')};
  }
`;

const GridSquare: FC<GridSquareProps> = ({ squareData, handleSquareClick }) => {
  const piece = squareData.piece;
  const value = squareData.piece && squareData.piece.value;
  const handleSquareSelect = (e: MouseEvent | KeyboardEvent): void => {
    handleSquareClick(piece && piece.id, squareData.isSelected, e.metaKey);
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
