import React from 'react';
import styled from 'styled-components';
import { GridPage } from './components/Grid/GridPage';

const AppWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template: 1fr 5fr 2fr / 1fr;
  justify-items: center;
`;

const App: React.FC = () => {
  return (
    <AppWrapper>
      Header
      <GridPage />
      Footer
    </AppWrapper>
  );
};

export default App;
