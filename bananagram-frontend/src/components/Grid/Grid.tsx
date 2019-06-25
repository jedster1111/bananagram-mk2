import React, {
  FC,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  memo
} from 'react';
import styled from 'styled-components';
import { SelectedPieces } from './gridTypes';
import { MemoGridRow } from './GridRow';
import { createSquares } from './createSquares';
import { Vector, createVector } from '../../utils/vector/vector';
import { Pieces } from '../../types';

interface GridProps {
  dimensions: Vector;
  pieces?: Pieces;
  offset?: Vector;
}

export const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  box-sizing: border-box;
  border: solid 1px black;
`;

export const Grid: FC<GridProps> = memo(
  ({ pieces = {}, offset = createVector(0, 0), dimensions }) => {
    const [selectedPieces, setSelectedPieces] = useState<SelectedPieces>({
      1: true,
      3: true
    });

    const handleSquareClick = useCallback(
      (id: string | undefined, isSelected: boolean, isCmdPressed: boolean) => {
        if (!id) {
          handleClickingEmptySquare(isCmdPressed, setSelectedPieces);
        } else {
          handleClickingSquare(isCmdPressed, isSelected, setSelectedPieces, id);
        }
      },
      []
    );

    const squares = createSquares(pieces, selectedPieces, dimensions);

    return (
      <GridWrapper>
        {squares.map((rowData, rowIndex) => (
          <MemoGridRow
            key={rowIndex}
            rowData={rowData}
            rowIndex={rowIndex}
            handleSquareClick={handleSquareClick}
          />
        ))}
      </GridWrapper>
    );
  }
);

function handleClickingSquare(
  isCmdPressed: boolean,
  isSelected: boolean,
  setSelectedPieces: Dispatch<SetStateAction<SelectedPieces>>,
  id: string
): void {
  if (isCmdPressed) {
    if (isSelected) {
      setSelectedPieces(prevState => removeSelectedPieceById(prevState, id));
    } else {
      setSelectedPieces(prevState => addSelectedPiece(prevState, id));
    }
  } else {
    setSelectedPieces({ [id]: true });
  }
}

function addSelectedPiece(
  prevState: SelectedPieces,
  id: string
): SelectedPieces {
  return { ...prevState, [id]: true };
}

function handleClickingEmptySquare(
  isCmdPressed: boolean,
  setSelectedPieces: (newSelectedPieces: SelectedPieces) => void
): void {
  if (!isCmdPressed) {
    setSelectedPieces({});
  }
  return;
}

function removeSelectedPieceById(
  selectedPieces: SelectedPieces,
  id: string
): SelectedPieces {
  const result = { ...selectedPieces };
  delete result[id];
  return result;
}
