import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cars from '../../pages/Cars';

const mockStore = configureStore([]);
const initialState = {
  cars: {
    cars: [/* your sample car objects here */],
  },
};

describe('Cars Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render without errors', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Route path="/" component={Cars} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('LATEST MODELS')).toBeInTheDocument();
    expect(screen.getByText('Please select a car model')).toBeInTheDocument();
    // Add more assertions as needed
  });
});
