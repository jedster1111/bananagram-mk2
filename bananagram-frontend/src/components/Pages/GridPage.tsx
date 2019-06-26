import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Grid } from '../Grid/Grid';
import {
  createVector,
  Vector,
  addVectors,
  isVectorSmallerThan
} from '../../utils/vector/vector';
import { GridControls } from '../Grid/GridControls/GridControls';
import { GridState } from '../Grid/GridState/GridState';
import { OffsetControlButton } from '../Grid/GridControls/OffsetControlButton';
import { Directions, Pieces } from '../../types';

const StyledGridPage = styled.div`
  display: grid;
  grid-template-areas:
    'main'
    'footer';
  grid-template-rows: 80vmin 100px;
  grid-template-columns: 75vmin;
  row-gap: 8px;

  align-items: center;
`;

const GridWrapper = styled.div`
  grid-area: main;

  padding: 8px;
  height: 100%;
  border: solid 1px black;

  display: grid;
  grid-template-columns: 50px 1fr 50px;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    '. up-arrow .'
    'left-arrow main right-arrow'
    '. down-arrow .';

  justify-items: center;
  align-items: center;
`;

const GridFooterWrapper = styled.div`
  box-sizing: border-box;
  grid-area: footer;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;

  border: solid 1px black;
  padding: 8px 10px;

  overflow: hidden;
`;

const directions: Directions[] = ['up', 'left', 'right', 'down'];

const initialOffset = createVector(0, 0);
const smallestSize = createVector(3, 3);
const largestSize = createVector(35, 35);
const invertOffset = true;

export const GridPage: FC<{
  initialGridDimensions?: Vector;
  pieces?: Pieces;
}> = ({ initialGridDimensions = createVector(10, 10), pieces = {} }) => {
  const [dimensions, setDimensions] = useState<Vector>(initialGridDimensions);
  const [offset, setOffset] = useState<Vector>(initialOffset);

  const handleZoomIn = (): void => {
    if (isVectorSmallerThan(dimensions, smallestSize)) {
      return;
    }
    setDimensions(prevDimensions =>
      addVectors(prevDimensions, createVector(-1, -1))
    );
  };

  const handleZoomOut = (): void => {
    if (isVectorSmallerThan(largestSize, dimensions)) {
      return;
    }

    setDimensions(prevDimensions =>
      addVectors(prevDimensions, createVector(1, 1))
    );
  };

  const handleOffsetChange = (offsetChange: Vector): void => {
    setOffset(prevOffset => addVectors(prevOffset, offsetChange));
  };

  const directionButtons = directions.map(direction => (
    <OffsetControlButton
      key={direction}
      direction={direction}
      onClickChangeOffsetButton={handleOffsetChange}
    />
  ));

  return (
    <StyledGridPage>
      <GridWrapper>
        {directionButtons}
        <Grid
          dimensions={dimensions}
          pieces={pieces}
          offset={offset}
          invertOffset={invertOffset}
        />
      </GridWrapper>
      <GridFooterWrapper>
        <GridState dimensions={dimensions} offset={offset} />
        <GridControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </GridFooterWrapper>
    </StyledGridPage>
  );
};
