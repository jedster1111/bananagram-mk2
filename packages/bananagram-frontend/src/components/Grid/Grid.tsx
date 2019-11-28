import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import { createVector, Vector } from 'simple-vectors';

import { Pieces } from '../../types';

import { SelectedPieces } from './gridTypes';
import { MemoGridRow } from './GridRow';
import { createSquares } from './createSquares';

interface GridProps {
  dimensions: Vector;
  pieces?: Pieces;
  offset?: Vector;
  invertOffset?: boolean;
}

export const GridWrapper = styled.div`
  grid-area: main;
  justify-self: stretch;
  align-self: stretch;

  display: flex;
  flex-direction: column;

  height: 100%;
  box-sizing: border-box;
  border: solid 1px black;
`;

const Grid: FC<GridProps> = ({
  pieces = {},
  offset = createVector(0, 0),
  dimensions,
  invertOffset,
}) => {
  const [selectedPieces, setSelectedPieces] = useState<SelectedPieces>({});

  const handleSquareClick = useCallback(
    (id: string | undefined, isSelected: boolean, isShiftPressed: boolean) => {
      if (!id) {
        handleClickingEmptySquare(isShiftPressed, setSelectedPieces);
      } else {
        handleClickingSquare(isShiftPressed, isSelected, setSelectedPieces, id);
      }
    },
    []
  );

  const squares = createSquares(
    pieces,
    selectedPieces,
    dimensions,
    offset,
    invertOffset
  );

  return (
    <GridWrapper
      data-testid="grid"
      data-offset={offset.toString()}
      data-dimensions={dimensions.toString()}
    >
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
};

export const MemoGrid = memo(Grid);

function handleClickingSquare(
  isShiftPressed: boolean,
  isSelected: boolean,
  setSelectedPieces: Dispatch<SetStateAction<SelectedPieces>>,
  id: string
): void {
  if (isShiftPressed) {
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
  isShiftPressed: boolean,
  setSelectedPieces: (newSelectedPieces: SelectedPieces) => void
): void {
  if (!isShiftPressed) {
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
