import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getPropertiesAsync } from './thunks';
const INITIAL_STATE = {
  list: [],
  error: null,
  getProperties: REQUEST_STATE.IDLE
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET House list
      .addCase(getPropertiesAsync.pending, (state) => {
        state.getProperties = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getPropertiesAsync.fulfilled, (state, action) => {
        state.getProperties = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getPropertiesAsync.rejected, (state, action) => {
        state.getProperties = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  }
});

export default propertiesSlice.reducer;
