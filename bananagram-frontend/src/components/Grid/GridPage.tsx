import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid } from './Grid';
import { createVector, createVectorKey } from '../../utils/vector/vector';

const StyledGridPage = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: 1fr 50vmin 1fr;
  grid-template-columns: 50vmin;
`;

export const GridPage: FC = () => (
  <StyledGridPage>
    <Grid
      dimensions={createVector(10, 10)}
      pieces={{
        [createVectorKey(1, 1)]: { id: '1', value: <div>1,1</div> },
        [createVectorKey(2, 1)]: { id: '2', value: '2,1' },
        [createVectorKey(4, 7)]: { id: '3', value: '4,7' }
      }}
      offset={createVector(0, 0)}
    />
  </StyledGridPage>
);
