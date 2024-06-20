import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getPropertiesAsync, addPropertyAsync, deletePropertyAsync, putPropertyAsync, patchPropertyAsync } from './thunks.js';

const INITIAL_STATE = {
  list: [],
  error: null,
  getProperties: REQUEST_STATE.IDLE,
  addProperty: REQUEST_STATE.IDLE,
  deleteProperty: REQUEST_STATE.IDLE,
  putProperty: REQUEST_STATE.IDLE,
  patchProperty: REQUEST_STATE.IDLE,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
        // GET Properties list
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
        })

        // ADD Property
        .addCase(addPropertyAsync.pending, (state) => {
          state.addProperty = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(addPropertyAsync.fulfilled, (state, action) => {
          state.addProperty = REQUEST_STATE.FULFILLED;
          state.list.push(action.payload);
        })
        .addCase(addPropertyAsync.rejected, (state, action) => {
          state.addProperty = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })

        // DELETE Property
        .addCase(deletePropertyAsync.pending, (state) => {
          state.deleteProperty = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(deletePropertyAsync.fulfilled, (state, action) => {
          state.deleteProperty = REQUEST_STATE.FULFILLED;
          state.list = state.list.filter(property => property.id !== action.payload);
        })
        .addCase(deletePropertyAsync.rejected, (state, action) => {
          state.deleteProperty = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })

        // PUT Property
        .addCase(putPropertyAsync.pending, (state) => {
          state.putProperty = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(putPropertyAsync.fulfilled, (state, action) => {
          state.putProperty = REQUEST_STATE.FULFILLED;
          const index = state.list.findIndex(property => property.id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        })
        .addCase(putPropertyAsync.rejected, (state, action) => {
          state.putProperty = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })

        // PATCH Property
        .addCase(patchPropertyAsync.pending, (state) => {
          state.patchProperty = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(patchPropertyAsync.fulfilled, (state, action) => {
          state.patchProperty = REQUEST_STATE.FULFILLED;
          const index = state.list.findIndex(property => property.id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        })
        .addCase(patchPropertyAsync.rejected, (state, action) => {
          state.patchProperty = REQUEST_STATE.REJECTED;
          state.error = action.error;
        });
  }
});

export default propertiesSlice.reducer;
