import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';

const baseUrl = 'http://localhost:5000/cars';

const initialState = {
  cars: [],
  selectedCar: null,
  isLoading: false,
  error: null,
};

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw Error(error.response?.data?.message || 'Failed to fetch cars');
  }
});

export const fetchSingleCar = createAsyncThunk(
  'coin/fetchSingleCar',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);

export const addNewCar = createAsyncThunk('cars/addNewCar', async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (id) => {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
      },
    });
    return id;
  },
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars(state, action) {
      state.cars = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload.data;
      })
      .addCase(fetchSingleCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addNewCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cars.push(action.payload);
      })
      .addCase(addNewCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // .addCase(deleteCar.fulfilled, (state, action) => ({
    //   ...state,
    //   cars: state.cars.filter((car) => car.id !== action.payload),
    // }));
    // .addCase(addCar.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(addCar.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // })
    // .addCase(addCar.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.cars.push(action.payload);
    // });
  },
});

export const { setCars } = carsSlice.actions;

export default carsSlice.reducer;
