import React, { FC } from 'react';
import { SquareData } from './gridTypes';
import styled from 'styled-components';
import { GridSquare } from './GridSquare';
import { createVector } from '../../utils/vector/vector';

interface GridRowProps {
  rowData: SquareData[];
  rowIndex: number;
}

const StyledGridRow = styled.div`
  display: flex;
  flex: 1;
`;

export const GridRow: FC<GridRowProps> = ({ rowData, rowIndex }) => (
  <StyledGridRow data-testid={rowIndex}>
    {rowData.map((squareData, colIndex) => (
      <GridSquare
        key={colIndex}
        squareData={squareData}
        position={createVector(colIndex, rowIndex)}
      />
    ))}
  </StyledGridRow>
);
