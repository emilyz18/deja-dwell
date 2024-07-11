import { createSlice } from '@reduxjs/toolkit'
import {
  getPropertiesAsync,
  addPropertyAsync,
  deletePropertyAsync,
  putPropertyAsync,
  patchPropertyAsync,
  getUnmatchedPropertiesAsync,
  getPreferPropertiesAsync,
} from './thunks'

const INITIAL_STATE = {
  list: [],
  unmatchProperties: [],
  preferProperties: [],
  error: null,
  getPreferProperties: 'IDLE',
  getUnmatchedProperties: 'IDLE',
  getProperties: 'IDLE',
  addProperty: 'IDLE',
  deleteProperty: 'IDLE',
  putProperty: 'IDLE',
  patchProperty: 'IDLE',
}

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: INITIAL_STATE,
  reducers: {
    removeProperty: (state, action) => {
      state.list = state.list.filter(
        (property) => property.HouseID !== action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertiesAsync.pending, (state) => {
        state.getProperties = 'PENDING'
        state.error = null
      })
      .addCase(getPropertiesAsync.fulfilled, (state, action) => {
        state.getProperties = 'FULFILLED'
        state.list = action.payload
      })
      .addCase(getPropertiesAsync.rejected, (state, action) => {
        state.getProperties = 'REJECTED'
        state.error = action.error.message
      })
      .addCase(getUnmatchedPropertiesAsync.pending, (state) => {
        state.getUnmatchedProperties = 'PENDING'
        state.error = null
      })
      .addCase(getUnmatchedPropertiesAsync.fulfilled, (state, action) => {
        state.getUnmatchedProperties = 'FULFILLED'
        state.unmatchProperties = action.payload
      })
      .addCase(getUnmatchedPropertiesAsync.rejected, (state, action) => {
        state.getUnmatchedProperties = 'REJECTED'
        state.error = action.error.message
      })
      .addCase(getPreferPropertiesAsync.pending, (state) => {
        state.getPreferProperties = 'PENDING'
        state.error = null
      })
      .addCase(getPreferPropertiesAsync.fulfilled, (state, action) => {
        state.getPreferProperties = 'FULFILLED'
        state.preferProperties = action.payload
      })
      .addCase(getPreferPropertiesAsync.rejected, (state, action) => {
        state.getPreferProperties = 'REJECTED'
        state.error = action.error.message
      })
      .addCase(addPropertyAsync.pending, (state) => {
        state.addProperty = 'PENDING'
        state.error = null
      })
      .addCase(addPropertyAsync.fulfilled, (state, action) => {
        state.addProperty = 'FULFILLED'
        state.list.push(action.payload)
      })
      .addCase(addPropertyAsync.rejected, (state, action) => {
        state.addProperty = 'REJECTED'
        state.error = action.error.message
      })
      .addCase(deletePropertyAsync.pending, (state) => {
        state.deleteProperty = 'PENDING'
        state.error = null
      })
      .addCase(deletePropertyAsync.fulfilled, (state, action) => {
        state.deleteProperty = 'FULFILLED'
        state.list = state.list.filter(
          (property) => property.id !== action.payload
        )
      })
      .addCase(deletePropertyAsync.rejected, (state, action) => {
        state.deleteProperty = 'REJECTED'
        state.error = action.error.message
      })
      .addCase(putPropertyAsync.pending, (state) => {
        state.putProperty = 'PENDING'
        state.error = null
      })
      .addCase(putPropertyAsync.fulfilled, (state, action) => {
        state.putProperty = 'FULFILLED'
        const index = state.list.findIndex(
          (property) => property.id === action.payload.id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      .addCase(putPropertyAsync.rejected, (state, action) => {
        state.putProperty = 'REJECTED'
        state.error = action.error.message
      })
      .addCase(patchPropertyAsync.pending, (state) => {
        state.patchProperty = 'PENDING'
        state.error = null
      })
      .addCase(patchPropertyAsync.fulfilled, (state, action) => {
        state.patchProperty = 'FULFILLED'
        const index = state.list.findIndex(
          (property) => property.id === action.payload.id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      .addCase(patchPropertyAsync.rejected, (state, action) => {
        state.patchProperty = 'REJECTED'
        state.error = action.error.message
      })
  },
})

export const { removeProperty } = propertiesSlice.actions
export default propertiesSlice.reducer
