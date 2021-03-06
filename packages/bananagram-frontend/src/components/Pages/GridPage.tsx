import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { addVectors, createVector, Vector } from 'simple-vectors';

import { MemoGrid } from '../Grid/Grid';
import { GridControls } from '../Grid/GridControls/GridControls';
import { GridInfo } from '../Grid/GridInfo/GridInfo';
import { OffsetControlButton } from '../Grid/GridControls/OffsetControlButton';
import { Directions, Pieces } from '../../types';

const StyledGridPage = styled.div`
  display: grid;
  grid-template-areas:
    'main'
    'footer';
  grid-template-rows: 8fr 1fr;
  row-gap: 8px;

  align-items: center;
`;

const GridWrapper = styled.div`
  grid-area: main;

  box-sizing: border-box;
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
  const [dimensionsSaved, setDimensionsSaved] = useState<Vector>(
    initialGridDimensions
  );
  const [offsetSaved, setOffsetSaved] = useState<Vector>(initialOffset);

  const handleZoomIn = (): void => {
    if (dimensions.x <= smallestSize.x || dimensions.y <= smallestSize.y) {
      return;
    }
    setDimensions(prevDimensions =>
      addVectors(prevDimensions, createVector(-1, -1))
    );
  };

  const handleSave = (): void => {
    setDimensionsSaved(dimensions);
    setOffsetSaved(offset);
  };

  const handleHome = (): void => {
    setDimensions(initialGridDimensions);
    setOffset(initialOffset);
  };

  const handleRestore = (): void => {
    setDimensions(dimensionsSaved);
    setOffset(offsetSaved);
  };

  const handleZoomOut = (): void => {
    if (largestSize.x <= dimensions.x || largestSize.y <= dimensions.y) {
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
        <MemoGrid
          dimensions={dimensions}
          pieces={pieces}
          offset={offset}
          invertOffset={invertOffset}
        />
      </GridWrapper>
      <GridFooterWrapper>
        <GridInfo dimensions={dimensions} offset={offset} />
        <GridControls
          onZoomIn={handleZoomIn}
          onSave={handleSave}
          onHome={handleHome}
          onRestore={handleRestore}
          onZoomOut={handleZoomOut}
          offset={offset}
          dimensions={dimensions}
          offsetSaved={offsetSaved}
          dimensionsSaved={dimensionsSaved}
          initialOffset={initialOffset}
          initialGridDimensions={initialGridDimensions}
        />
      </GridFooterWrapper>
    </StyledGridPage>
  );
};
