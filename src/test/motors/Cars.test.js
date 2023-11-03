import React from 'react';
import renderer from 'react-test-renderer';
import Cars from '../../pages/Cars';

describe('Cars', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Cars />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
