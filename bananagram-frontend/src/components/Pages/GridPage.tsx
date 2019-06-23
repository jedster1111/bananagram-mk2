import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Grid } from '../Grid/Grid';
import {
  createVector,
  createVectorKey,
  Vector,
  addVectors,
  isVectorSmallerThan
} from '../../utils/vector/vector';
import { GridControls } from '../Grid/GridControls/GridControls';

const StyledGridPage = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: 1fr 50vmin 1fr;
  grid-template-columns: 50vmin;
  row-gap: 8px;
`;

const GridWrapper = styled.div`
  grid-area: main;
  width: 100%;
  height: 100%;
`;

const GridControlsWrapper = styled.div`
  grid-area: footer;
`;

const pieces = {
  [createVectorKey(1, 1)]: { id: '1', value: <div>1,1</div> },
  [createVectorKey(0, 5)]: { id: '2', value: '0,5' },
  [createVectorKey(4, 7)]: { id: '3', value: '4,7' }
};
const offset = createVector(0, 0);
const smallestSize = createVector(3, 3);
const largestSize = createVector(35, 35);

export const GridPage: FC<{ initialGridDimensions?: Vector }> = ({
  initialGridDimensions = createVector(10, 10)
}) => {
  const [dimensions, setDimensions] = useState<Vector>(initialGridDimensions);

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

  return (
    <StyledGridPage>
      <GridWrapper>
        <Grid dimensions={dimensions} pieces={pieces} offset={offset} />
      </GridWrapper>
      <GridControlsWrapper>
        <GridControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </GridControlsWrapper>
    </StyledGridPage>
  );
};
