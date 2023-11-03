// mockStore.js
export const mockState = {
  cars: [
    // Define your sample car objects here
    // Example:
    {
      id: 1,
      model: 'Car Model 1',
      picture: 'car1.jpg',
    },
    {
      id: 2,
      model: 'Car Model 2',
      picture: 'car2.jpg',
    },
  ],
};

export const mockDispatch = jest.fn();

export const mockSelector = (selector) => selector(mockState);

export const useDispatch = () => mockDispatch;
