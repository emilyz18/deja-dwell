import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { signInAsync, signUpAsync } from './thunks';

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Sign in
        .addCase(signInAsync.pending, (state) => {
          state.error = null;
        })
        .addCase(signInAsync.fulfilled, (state, action) => {
          console.log(action.payload);
          const userPayload = action.payload;
          state.isAuthenticated = userPayload.Auth;
          state.user = userPayload.User;
        })
        .addCase(signInAsync.rejected, (state, action) => {
          state.error = action.error;
        })
        // Register 
        .addCase(signUpAsync.pending, (state) => {
          state.error = null;
        })
        .addCase(signUpAsync.fulfilled, (state, action) => {
          const userPayload = action.payload;
          state.isAuthenticated = userPayload.Auth;
          state.user = userPayload.User;
        })
        .addCase(signUpAsync.rejected, (state, action) => {
          state.error = action.error;
        });
  }
});

export default userSlice.reducer;
