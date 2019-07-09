import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from '../../common/Button';

interface GridControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const GridControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ZoomButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const GridControls: FC<GridControlsProps> = ({
  onZoomIn,
  onZoomOut
}) => (
  <GridControlsWrapper>
    <ZoomButtonsWrapper>
      <Button onClick={onZoomOut}>-</Button>
      <Button onClick={onZoomIn}>+</Button>
    </ZoomButtonsWrapper>
  </GridControlsWrapper>
);
