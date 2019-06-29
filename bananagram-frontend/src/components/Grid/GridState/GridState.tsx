import React, { FC } from 'react';
import { Vector } from '../../../utils/vector/vector';
import styled from 'styled-components';

interface GridStateProps {
  offset: Vector;
  dimensions: Vector;
}

const GridStateWrapper = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
`;

const GridStateItem = styled.span`
  flex: 1;

  margin: 0 5px;
  text-align: center;
`;

const NoWrapText = styled.span`
  white-space: nowrap;
  overflow: hidden;
`;

export const GridState: FC<GridStateProps> = ({ dimensions, offset }) => (
  <GridStateWrapper>
    <GridStateItem>
      Camera: <NoWrapText>{`${offset.x}, ${offset.y}`}</NoWrapText>
    </GridStateItem>
    <GridStateItem>{`Dimensions: ${dimensions.x}x${dimensions.y}`}</GridStateItem>
  </GridStateWrapper>
);
