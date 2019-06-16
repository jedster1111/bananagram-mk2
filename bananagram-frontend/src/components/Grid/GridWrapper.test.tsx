import React from 'react';
import { render } from '@testing-library/react';
import { GridWrapper } from './Grid';

describe('GridWrapper', () => {
  it('should render with correct styles', () => {
    const { container } = render(<GridWrapper />);
    expect(container.firstChild).toHaveStyleRule('grid-area', 'main');
  });
});
