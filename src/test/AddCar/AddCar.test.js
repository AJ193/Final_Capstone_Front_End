import React from 'react';
import renderer from 'react-test-renderer';
import AddCar from '../../pages/AddCar';

describe('AddCar', () => {
  it('renders correctly', () => {
    const component = renderer.create(<AddCar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
