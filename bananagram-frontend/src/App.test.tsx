import React from 'react';
import App from './App';
import { render } from '@testing-library/react';

describe('App', () => {
  it('should render a header, body and footer', () => {
    const { getByText } = render(<App />);

    getByText('Header');
    getByText('Footer');
  });
});
