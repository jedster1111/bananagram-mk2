import { renderHook } from '@testing-library/react-hooks';

import { useWhyDidYouUpdate } from './useWhyDidYouUpdate';

describe('useWhyDidYouUpdate', () => {
  const spiedLog = jest.spyOn(global.console, 'log');
  const initialProps: {
    someProp: string;
    otherProp: string;
    someNewProp?: string;
  } = { someProp: 'initialValue', otherProp: 'otherProp' };
  it('should console log props that have changed', () => {
    const { rerender } = renderHook(
      props => useWhyDidYouUpdate('testComponent', props),
      {
        initialProps
      }
    );

    rerender({
      someProp: 'newValue',
      someNewProp: 'newProp',
      otherProp: 'otherProp'
    });

    expect(spiedLog).toHaveBeenCalledWith(
      '[why-did-you-update]',
      'testComponent',
      {
        someNewProp: { from: undefined, to: 'newProp' },
        someProp: { from: 'initialValue', to: 'newValue' }
      }
    );
  });

  it('should NOT call console.log if no props have changed', () => {
    const { rerender } = renderHook(
      props => useWhyDidYouUpdate('testComponent', props),
      {
        initialProps
      }
    );

    rerender({ someProp: 'initialValue', otherProp: 'otherProp' });

    expect(spiedLog).not.toHaveBeenCalled();
  });
});
