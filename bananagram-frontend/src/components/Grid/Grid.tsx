import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { SelectedPieces } from './gridTypes';
import { GridRow } from './GridRow';
import { createSquares } from './createSquares';
import { Vector, createVector } from '../../utils/vector/vector';
import { Pieces } from '../../types';

interface GridProps {
  dimensions: Vector;
  pieces?: Pieces;
  offset?: Vector;
}

export const GridWrapper = styled.div`
  grid-area: main;

  box-sizing: border-box;
  border: solid 1px black;
  display: flex;
  flex-direction: column;
`;

export const Grid: FC<GridProps> = ({
  pieces = {},
  offset = createVector(0, 0),
  dimensions
}) => {
  const [selectedPieces, setSelectedPiece] = useState<SelectedPieces>({
    [1]: true,
    [3]: true
  });

  const squares = createSquares(pieces, selectedPieces, dimensions);

  return (
    <GridWrapper>
      {squares.map((rowData, rowIndex) => (
        <GridRow key={rowIndex} rowData={rowData} rowIndex={rowIndex} />
      ))}
    </GridWrapper>
  );
};
