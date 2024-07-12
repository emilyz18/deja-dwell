import { createSlice } from '@reduxjs/toolkit'
import {
  getPropertiesAsync,
  createPropertyAsync,
  deletePropertyAsync,
  putPropertyAsync,
  patchPropertyAsync,
  getUnmatchedPropertiesAsync,
  getPropertyByIdAsync,
  getPreferPropertiesAsync,
} from './thunks'

const INITIAL_STATE = {
  list: [],
  unmatchProperties: [],
  error: null,
  property: {
    HouseImgs: [
      { src: '', alt: '' },
      { src: '', alt: '' },
      { src: '', alt: '' },
    ],
  },
  getPreferProperties: 'IDLE',
  getUnmatchedProperties: 'IDLE',
  getProperties: 'IDLE',
  getPropertyById: 'IDLE',
  createProperty: 'IDLE',
  deleteProperty: 'IDLE',
  putProperty: 'IDLE',
  patchProperty: 'IDLE',
  preferProperties: 'IDLE'
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
    updateProperty: (state, action) => {
      state.property = {...state.property, ...action.payload}
    }
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
      .addCase(getPropertyByIdAsync.pending, (state) => {
        state.getPropertyById = 'PENDING'
        state.error = null
      })
      .addCase(getPropertyByIdAsync.fulfilled, (state, action) => {
        state.getPropertyById = 'FULFILLED'
        state.property = action.payload
      })
      .addCase(getPropertyByIdAsync.rejected, (state, action) => {
        state.getPropertyById = 'REJECTED'
        state.error = action.error.message
      })

      .addCase(createPropertyAsync.pending, (state) => {
        state.createProperty = 'PENDING'
        state.error = null
      })
      .addCase(createPropertyAsync.fulfilled, (state, action) => {
        state.createProperty = 'FULFILLED'
        state.list.push(action.payload)
        state.property = { ...INITIAL_STATE.property, ...action.payload } 
      })
      .addCase(createPropertyAsync.rejected, (state, action) => {
        state.createProperty = 'REJECTED'
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
          (property) => property.HouseID === action.payload.HouseID
        )
        if (index !== -1) {
          state.list[index] = action.payload
          state.property = { ...INITIAL_STATE.property, ...action.payload } 
        }
      })
      .addCase(patchPropertyAsync.rejected, (state, action) => {
        state.patchProperty = 'REJECTED'
        state.error = action.error.message
      })
  },
})

export const { removeProperty, updateProperty} = propertiesSlice.actions
export default propertiesSlice.reducer
