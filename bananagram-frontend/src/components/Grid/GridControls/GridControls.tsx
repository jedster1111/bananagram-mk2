import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from '../../common/Button';

interface GridControlsProps {
  onZoomIn: () => void;
  onHome: () => void;
  onZoomOut: () => void;
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
  onHome,
  onZoomOut,
}) => (
  <GridControlsWrapper>
    <ControlButtonsWrapper>
      <Button onClick={onZoomOut}>-</Button>
      <Button onClick={onHome}>Home</Button>
      <Button onClick={onZoomIn}>+</Button>
    </ControlButtonsWrapper>
  </GridControlsWrapper>
);
