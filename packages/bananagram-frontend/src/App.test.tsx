import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('should render a header, body and footer', () => {
    const { getByText } = render(<App />);

    getByText('Header');
    getByText('Footer');
  });
});
