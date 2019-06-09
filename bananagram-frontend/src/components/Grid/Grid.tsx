import React, { FC, ReactNode } from 'react';
import { Vector, createVectorKey } from '../../utils/Vector';
import styled from 'styled-components';
import {
  GridProps,
  GridPiece,
  GridPieces,
  GridSquares,
  GridRow
} from './gridTypes';

const GridWrapper = styled.div`
  grid-area: main;

  box-sizing: border-box;
  border: solid 1px black;
  display: flex;
  flex-direction: column;
`;

const StyledGridSquare = styled.div`
  border: solid 1px black;
  flex: 1;
`;

const StyledGridRow = styled.div`
  display: flex;
  flex: 1;
`;

export const Grid: FC<GridProps> = ({ pieces, dimensions }) => {
  const squareData = createSquares(pieces, dimensions);
  const squares = createRenderSquares(squareData);

  return <GridWrapper>{squares}</GridWrapper>;
};

function createRenderSquares(squareData: GridPiece[][]): ReactNode {
  return squareData.map((squareRow, rowIndex) => (
    <StyledGridRow key={rowIndex}>
      {squareRow.map((square, colIndex) => (
        <StyledGridSquare key={colIndex}>{square.value}</StyledGridSquare>
      ))}
    </StyledGridRow>
  ));
}

function createSquares(pieces: GridPieces, dimensions: Vector): GridSquares {
  const squares: GridSquares = [];
  for (let rowIndex = 0; rowIndex < dimensions.y; rowIndex++) {
    const row: GridRow = [];
    for (let colIndex = 0; colIndex < dimensions.x; colIndex++) {
      const squareKey = createVectorKey(colIndex, rowIndex);
      const piece = pieces[squareKey] as GridPiece | undefined;
      row.push({ value: piece && piece.value, isSelected: false });
    }
    squares.push(row);
  }
  return squares;
}
