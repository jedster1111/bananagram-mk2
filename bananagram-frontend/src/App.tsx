import React from 'react';
import { createVectorKey } from 'simple-vectors';
import styled from 'styled-components';

import { GridPage } from './components/Pages/GridPage';

const AppWrapper = styled.div`
  display: grid;
  grid-template: 50px 1fr 50px / 1fr;
  justify-items: stretch;

  box-sizing: border-box;
  padding: 10px;
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const pieces = {
  [createVectorKey(1, 1)]: { id: '1', value: <div>1,1</div> },
  [createVectorKey(0, 5)]: { id: '2', value: '0,5' },
  [createVectorKey(4, 7)]: { id: '3', value: '4,7' }
};

const App: React.FC = () => {
  return (
    <AppWrapper data-testid="App">
      <header>Header</header>
      <GridPage pieces={pieces} />
      <footer>Footer</footer>
    </AppWrapper>
  );
};

export default App;
