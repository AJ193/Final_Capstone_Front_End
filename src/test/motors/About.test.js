import React from 'react';
import renderer from 'react-test-renderer';
import About from '../../pages/About';

describe('About Component', () => {
  it('should render correctly', () => {
    const component = renderer.create(<About />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
