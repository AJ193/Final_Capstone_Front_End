import React from 'react';
import renderer from 'react-test-renderer';
import Reservations from '../../pages/Reservations';

describe('Reservations', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Reservations />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
