import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils'
import {
  createMatchAsync,
  updateMatchAsync,
  deleteMatchAsync,
  getLandlordMatchesAsync,
  getTenantMatchesAsync,
} from './matchThunks'

const INITIAL_STATE = {
  list: [],
  error: null,
  landlordMatches: [],
  tenantMatches: [],
  getLandlordMatches: REQUEST_STATE.IDLE,
  getTenantMatches: REQUEST_STATE.IDLE,
  createMatch: REQUEST_STATE.IDLE,
  updateMatch: REQUEST_STATE.IDLE,
  deleteMatch: REQUEST_STATE.IDLE,
}

const matchSlice = createSlice({
  name: 'matches',
  initialState: INITIAL_STATE,
  reducers: {
    // Update specific match in the state
    updateMatch: (state, action) => {
      const index = state.list.findIndex(
        (match) => match.MatchID === action.payload.MatchID
      )
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE Match
      .addCase(createMatchAsync.pending, (state) => {
        state.createMatch = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(createMatchAsync.fulfilled, (state, action) => {
        state.createMatch = REQUEST_STATE.FULFILLED
        state.getLandlordMatches = REQUEST_STATE.IDLE
        state.getTenantMatches = REQUEST_STATE.IDLE
        state.list.push(action.payload)
      })
      .addCase(createMatchAsync.rejected, (state, action) => {
        state.createMatch = REQUEST_STATE.REJECTED
        state.getLandlordMatches = REQUEST_STATE.IDLE
        state.getTenantMatches = REQUEST_STATE.IDLE
        state.error = action.error.message
      })

      // UPDATE Match
      .addCase(updateMatchAsync.pending, (state) => {
        state.updateMatch = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(updateMatchAsync.fulfilled, (state, action) => {
        state.updateMatch = REQUEST_STATE.FULFILLED
        state.getLandlordMatches = REQUEST_STATE.IDLE
        state.getTenantMatches = REQUEST_STATE.IDLE
        const index = state.list.findIndex(
          (match) => match.MatchID === action.payload.MatchID
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      .addCase(updateMatchAsync.rejected, (state, action) => {
        state.updateMatch = REQUEST_STATE.REJECTED
        state.getLandlordMatches = REQUEST_STATE.IDLE
        state.getTenantMatches = REQUEST_STATE.IDLE
        state.error = action.error.message
      })

      // DELETE Match
      .addCase(deleteMatchAsync.pending, (state) => {
        state.deleteMatch = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(deleteMatchAsync.fulfilled, (state, action) => {
        state.deleteMatch = REQUEST_STATE.FULFILLED
        state.list = state.list.filter(
          (match) => match.MatchID !== action.payload
        )
      })
      .addCase(deleteMatchAsync.rejected, (state, action) => {
        state.deleteMatch = REQUEST_STATE.REJECTED
        state.error = action.error.message
      })

      // GET Landlord Matches
      .addCase(getLandlordMatchesAsync.pending, (state) => {
        state.getLandlordMatches = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(getLandlordMatchesAsync.fulfilled, (state, action) => {
        state.getLandlordMatches = REQUEST_STATE.FULFILLED
        state.landlordMatches = action.payload
      })
      .addCase(getLandlordMatchesAsync.rejected, (state, action) => {
        state.getLandlordMatches = REQUEST_STATE.REJECTED
        state.error = action.error.message
      })

      // GET tenant Matches
      .addCase(getTenantMatchesAsync.pending, (state) => {
        state.getTenantMatches = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(getTenantMatchesAsync.fulfilled, (state, action) => {
        state.getTenantMatches = REQUEST_STATE.FULFILLED
        state.tenantMatches = action.payload
      })
      .addCase(getTenantMatchesAsync.rejected, (state, action) => {
        state.getTenantMatches = REQUEST_STATE.REJECTED
        state.error = action.error.message
      })
  },
})

export const { updateMatch } = matchSlice.actions
export default matchSlice.reducer
