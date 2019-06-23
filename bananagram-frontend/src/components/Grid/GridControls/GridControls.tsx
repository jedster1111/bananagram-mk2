import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../../common/Button';

interface GridControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const GridControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ZoomButtonsWrapper = styled.div``;

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
