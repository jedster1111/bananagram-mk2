import React, { FC } from 'react';
import styled from 'styled-components';
import { Vector } from 'simple-vectors';

import { Button } from '../../common/Button';

interface GridControlsProps {
  onZoomIn: () => void;
  onSave: () => void;
  onHome: () => void;
  onRestore: () => void;
  onZoomOut: () => void;
  offset: Vector;
  dimensions: Vector;
  offsetSaved: Vector;
  dimensionsSaved: Vector;
  initialOffset: Vector;
  initialGridDimensions: Vector;
}

const GridControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ControlButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const GridControls: FC<GridControlsProps> = ({
  onZoomIn,
  onSave,
  onHome,
  onRestore,
  onZoomOut,
  offset,
  dimensions,
  offsetSaved,
  dimensionsSaved,
  initialOffset,
  initialGridDimensions,
}) => (
  <GridControlsWrapper>
    <ControlButtonsWrapper>
      <Button onClick={onZoomOut}>-</Button>
      <Button onClick={onSave}>
        {`Save(${offset.x}, ${offset.y}@${dimensions.x}x${dimensions.y})`}
      </Button>
      <Button onClick={onHome}>
        {`Home(${initialOffset.x}, ${initialOffset.y}@${initialGridDimensions.x}x${initialGridDimensions.y})`}
      </Button>
      <Button onClick={onRestore}>
        {`Restore(${offsetSaved.x}, ${offsetSaved.y}@${dimensionsSaved.x}x${dimensionsSaved.y})`}
      </Button>
      <Button onClick={onZoomIn}>+</Button>
    </ControlButtonsWrapper>
  </GridControlsWrapper>
);
