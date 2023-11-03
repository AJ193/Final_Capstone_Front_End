import React from 'react';
import renderer from 'react-test-renderer';
import DeleteCar from '../../pages/DeleteCar';

describe('DeleteCar', () => {
  it('renders correctly', () => {
    const component = renderer.create(<DeleteCar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
