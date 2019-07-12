import React from 'react';
import { render } from '@testing-library/react';
import { createVector } from 'simple-vectors';

import { GridInfo } from './GridInfo';

describe('GridInfo', () => {
  const defaultProps = {
    dimensions: createVector(10, 10),
    offset: createVector(2, 1)
  };
  it('should render the camera offset in the format x, y', () => {
    const { getByText } = render(<GridInfo {...defaultProps} />);
    getByText('2, 1');
  });
  it('should render the dimensions in the format 1x1', () => {
    const { getByText } = render(<GridInfo {...defaultProps} />);
    getByText('10x10', { exact: false });
  });
});
