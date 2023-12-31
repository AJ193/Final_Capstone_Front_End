import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservations: [],
  reservationIsLoading: false, // Change 'reservationIsLoading' here
  error: [],
  reservedDatesByCarId: {},
};

const baseUrl = 'https://car-rental-iwkn.onrender.com/reservations';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async (token) => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: token,
    },
  });
  const reservations = response.data;
  const disabledDates = reservations.map((reservation) => reservation.rental_date);

  return { reservations, disabledDates };
});

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservation, { getState }) => {
    try {
      const { token } = getState().auth; // Assuming you have an 'auth' slice for authentication
      const response = await axios.post('https://car-rental-iwkn.onrender.com/reservations', reservation, {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to create a reservation');
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.reservationIsLoading = true; // Change 'isLoading' to 'reservationIsLoading'
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.error = action.error;
        state.reservationIsLoading = false; // Change 'isLoading' to 'reservationIsLoading'
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservations = action.payload.reservations;
        state.reservationIsLoading = false; // Change 'isLoading' to 'reservationIsLoading'
      })
      .addCase(createReservation.pending, (state) => {
        state.reservationIsLoading = true; // Change 'isLoading' to 'reservationIsLoading'
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.reservationIsLoading = false; // Change 'isLoading' to 'reservationIsLoading'
        state.error = null;
        state.reservations.push(action.payload); // Push into 'reservations', not 'cars'
      })
      .addCase(createReservation.rejected, (state) => {
        state.reservationIsLoading = false; // Change 'isLoading' to 'reservationIsLoading'
      });
  },
});

export default reservationSlice.reducer;
