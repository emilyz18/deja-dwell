import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils'
import {
  getUsersAsync,
  addUserAsync,
  deleteUserAsync,
  putUserAsync,
  patchUserAsync,
  getUserByIdAsync,
} from './thunks.js'

const INITIAL_STATE = {
  list: [],
  error: null,
  getUsers: REQUEST_STATE.IDLE,
  getUserById: REQUEST_STATE.IDLE,
  addUser: REQUEST_STATE.IDLE,
  deleteUser: REQUEST_STATE.IDLE,
  putUser: REQUEST_STATE.IDLE,
  patchUser: REQUEST_STATE.IDLE,
}

const usersSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Users list
      .addCase(getUsersAsync.pending, (state) => {
        state.getUsers = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.getUsers = REQUEST_STATE.FULFILLED
        state.list = action.payload
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.getUsers = REQUEST_STATE.REJECTED
        state.error = action.error
      })

      // // GET User by id list
      .addCase(getUserByIdAsync.pending, (state) => {
        state.getUserById = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.getUserById = REQUEST_STATE.FULFILLED
        state.list = action.payload
      })
      .addCase(getUserByIdAsync.rejected, (state, action) => {
        state.getUserById = REQUEST_STATE.REJECTED
        state.error = action.error
      })

      // ADD User
      .addCase(addUserAsync.pending, (state) => {
        state.addUser = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.addUser = REQUEST_STATE.FULFILLED
        state.list.push(action.payload)
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.addUser = REQUEST_STATE.REJECTED
        state.error = action.error
      })

      // DELETE User
      .addCase(deleteUserAsync.pending, (state) => {
        state.deleteUser = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.deleteUser = REQUEST_STATE.FULFILLED
        state.list = state.list.filter((user) => user.id !== action.payload)
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.deleteUser = REQUEST_STATE.REJECTED
        state.error = action.error
      })

      // PUT User
      .addCase(putUserAsync.pending, (state) => {
        state.putUser = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(putUserAsync.fulfilled, (state, action) => {
        state.putUser = REQUEST_STATE.FULFILLED
        const index = state.list.findIndex(
          (user) => user.id === action.payload.id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      .addCase(putUserAsync.rejected, (state, action) => {
        state.putUser = REQUEST_STATE.REJECTED
        state.error = action.error
      })

      // PATCH User
      .addCase(patchUserAsync.pending, (state) => {
        state.patchUser = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(patchUserAsync.fulfilled, (state, action) => {
        state.patchUser = REQUEST_STATE.FULFILLED
        const index = state.list.findIndex(
          (user) => user.id === action.payload.id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      .addCase(patchUserAsync.rejected, (state, action) => {
        state.patchUser = REQUEST_STATE.REJECTED
        state.error = action.error
      })
  },
})

export default usersSlice.reducer
