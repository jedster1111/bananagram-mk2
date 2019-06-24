import React from 'react';
import { GridState } from './GridState';
import { createVector } from '../../../utils/vector/vector';
import { render } from '@testing-library/react';

describe('GridState', () => {
  const defaultProps = {
    dimensions: createVector(10, 10),
    offset: createVector(0, 0)
  };
  it('should render the camera offset in the format x-y', () => {
    const { getByText } = render(<GridState {...defaultProps} />);
    getByText('0-0');
  });
  it('should render the dimensions in the format 1x1', () => {
    const { getByText } = render(<GridState {...defaultProps} />);
    getByText('10x10', { exact: false });
  });
});
