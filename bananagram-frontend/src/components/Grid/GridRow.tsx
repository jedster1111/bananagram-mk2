import React, { FC, memo } from 'react';
import styled from 'styled-components';

import shallowEquals from '../../utils/shallowEquals';

import { SquareData } from './gridTypes';
import { MemoGridSquare } from './GridSquare';

interface GridRowProps {
  rowData: SquareData[];
  rowIndex: number;
  handleSquareClick: (
    id: string | undefined,
    isSelected: boolean,
    isCmdPressed: boolean
  ) => void;
}

const StyledGridRow = styled.div`
  display: flex;
  flex: 1;
`;

const GridRow: FC<GridRowProps> = ({
  rowData,
  rowIndex,
  handleSquareClick,
}) => {
  return (
    <StyledGridRow data-testid={rowIndex}>
      {rowData.map((squareData, colIndex) => (
        <MemoGridSquare
          key={colIndex}
          squareData={squareData}
          handleSquareClick={handleSquareClick}
        />
      ))}
    </StyledGridRow>
  );
};

export const MemoGridRow: FC<GridRowProps> = memo(
  GridRow,
  (
    { rowData: prevRowData, ...prevProps },
    { rowData: nextRowData, ...nextProps }
  ) => {
    return (
      shallowEquals(prevProps, nextProps) &&
      shallowEquals(prevRowData, nextRowData)
    );
  }
);
