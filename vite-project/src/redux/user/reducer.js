import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils'
import { signInAsync, signUpAsync, editUserAsync, getUserAsync } from './thunks'

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  isLandlord: false,
  isTenant: false,
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
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        const userPayload = action.payload
        state.isAuthenticated = userPayload.Auth
        state.user = userPayload.User
        state.isLandlord = userPayload.User.isLandlord
        state.isTenant = userPayload.User.isTenant
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.error = action.error
      })
      // Register
      .addCase(signUpAsync.pending, (state) => {
        state.error = null
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        const userPayload = action.payload
        state.isAuthenticated = userPayload.Auth
        state.user = userPayload.User
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.error = action.error
      })

      //getUserAsync
      .addCase(getUserAsync.pending, (state) => {
        state.error = null
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        // const userPayload = action.payload;
        // console.log('getUserAsync fullfilled:', action.payload);

        state.user = action.payload
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        console.log('getUserAsync reject:', action.error)
        state.error = action.error
      })

      // edit user profile
      .addCase(editUserAsync.pending, (state) => {
        state.error = null
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        // const userPayload = action.payload;
        console.log('editUserAsync fullfilled:', action.payload)

        state.user = action.payload
      })
      .addCase(editUserAsync.rejected, (state, action) => {
        state.error = action.error
      })
  },
})
export const { updateUser } = userSlice.actions
export default userSlice.reducer
