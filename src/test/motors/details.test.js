import React from 'react';
import renderer from 'react-test-renderer';
import CarDetails from '../../pages/CarDetails';

describe('CarDetails', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CarDetails />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
