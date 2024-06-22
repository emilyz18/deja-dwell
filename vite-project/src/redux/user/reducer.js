import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils'
import {
  signInAsync,
  signUpAsync,
  editUserAsync,
  getUserAsync,
  getAllUsersAsync,
} from './thunks'

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  isLandlord: false,
  isTenant: false,
  users: [],
  error: null,
  requestState: REQUEST_STATE.IDLE,
}

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign in
      .addCase(signInAsync.pending, (state) => {
        state.error = null
        state.requestState = REQUEST_STATE.PENDING
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        const userPayload = action.payload
        state.isAuthenticated = userPayload.Auth
        state.user = userPayload.User
        state.isLandlord = userPayload.User.isLandlord
        state.isTenant = userPayload.User.isTenant
        state.requestState = REQUEST_STATE.FULFILLED
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.error = action.error
        state.requestState = REQUEST_STATE.REJECTED
      })
      // Register
      .addCase(signUpAsync.pending, (state) => {
        state.error = null
        state.requestState = REQUEST_STATE.PENDING
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        const userPayload = action.payload
        state.isAuthenticated = userPayload.Auth
        state.user = userPayload.User
        state.requestState = REQUEST_STATE.FULFILLED
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.error = action.error
        state.requestState = REQUEST_STATE.REJECTED
      })
      // Get User
      .addCase(getUserAsync.pending, (state) => {
        state.error = null
        state.requestState = REQUEST_STATE.PENDING
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload
        state.requestState = REQUEST_STATE.FULFILLED
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.error = action.error
        state.requestState = REQUEST_STATE.REJECTED
      })
      // Edit User Profile
      .addCase(editUserAsync.pending, (state) => {
        state.error = null
        state.requestState = REQUEST_STATE.PENDING
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        state.user = action.payload
        state.requestState = REQUEST_STATE.FULFILLED
      })
      .addCase(editUserAsync.rejected, (state, action) => {
        state.error = action.error
        state.requestState = REQUEST_STATE.REJECTED
      })
      // Get All Users
      .addCase(getAllUsersAsync.pending, (state) => {
        state.error = null
        state.requestState = REQUEST_STATE.PENDING
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload
        state.requestState = REQUEST_STATE.FULFILLED
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.error = action.error
        state.requestState = REQUEST_STATE.REJECTED
      })
  },
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer
