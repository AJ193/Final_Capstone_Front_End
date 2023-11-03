import React from 'react';
import renderer from 'react-test-renderer';
import AddReservations from '../../pages/AddReservations';

describe('AddReservations', () => {
  it('renders correctly', () => {
    const component = renderer.create(<AddReservations />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
