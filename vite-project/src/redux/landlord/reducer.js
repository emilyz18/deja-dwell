import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils'
import {
  getLandlordAsync,
} from './thunks'

const INITIAL_STATE = {
  landlord: {},
}

const landlordSlice = createSlice({
  name: 'landlord',
  initialState: INITIAL_STATE,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLandlordAsync.pending, (state) => {
        state.error = null
        state.requestState = REQUEST_STATE.PENDING
      })
      .addCase(getLandlordAsync.fulfilled, (state, action) => {
        state.landlord = action.payload
        state.requestState = REQUEST_STATE.FULFILLED
      })
      .addCase(getLandlordAsync.rejected, (state, action) => {
        state.landlord = action.error
        state.requestState = REQUEST_STATE.REJECTED
      })
  },
})

export default landlordSlice.reducer
