import React, { FC } from 'react';
import styled from 'styled-components';
import { Vector } from 'simple-vectors';

interface GridInfoProps {
  offset: Vector;
  dimensions: Vector;
}

const GridInfoWrapper = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
`;

const GridInfoItem = styled.span`
  flex: 1;

  margin: 0 5px;
  text-align: center;
`;

const NoWrapText = styled.span`
  white-space: nowrap;
  overflow: hidden;
`;

export const GridInfo: FC<GridInfoProps> = ({ dimensions, offset }) => (
  <GridInfoWrapper>
    <GridInfoItem>
      Camera: <NoWrapText>{`${offset.x}, ${offset.y}`}</NoWrapText>
    </GridInfoItem>
    <GridInfoItem>{`Dimensions: ${dimensions.x}x${dimensions.y}`}</GridInfoItem>
  </GridInfoWrapper>
);
