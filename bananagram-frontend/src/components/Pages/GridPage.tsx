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
import { GridState } from '../Grid/GridState/GridState';

const StyledGridPage = styled.div`
  display: grid;
  grid-template-areas:
    'main'
    'footer';
  grid-template-rows: 75vmin 100px;
  grid-template-columns: 75vmin;
  row-gap: 8px;

  align-items: center;
`;

const GridWrapper = styled.div`
  grid-area: main;
  width: 100%;
  height: 100%;
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

const pieces = {
  [createVectorKey(1, 1)]: { id: '1', value: <div>1,1</div> },
  [createVectorKey(0, 5)]: { id: '2', value: '0,5' },
  [createVectorKey(4, 7)]: { id: '3', value: '4,7' }
};
const initialOffset = createVector(0, 0);
const smallestSize = createVector(3, 3);
const largestSize = createVector(35, 35);

export const GridPage: FC<{ initialGridDimensions?: Vector }> = ({
  initialGridDimensions = createVector(10, 10)
}) => {
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

  return (
    <StyledGridPage>
      <GridWrapper>
        <Grid dimensions={dimensions} pieces={pieces} offset={offset} />
      </GridWrapper>
      <GridFooterWrapper>
        <GridState dimensions={dimensions} offset={offset} />
        <GridControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </GridFooterWrapper>
    </StyledGridPage>
  );
};
