import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import userService from './service'

export const signInAsync = createAsyncThunk(
  actionTypes.SIGN_IN,
  async (user) => {
    return await userService.signIn(user)
  }
)

export const signUpAsync = createAsyncThunk(
  actionTypes.SIGN_UP,
  async (user) => {
    return await userService.signUp(user)
  }
)

export const getUserAsync = createAsyncThunk(
  actionTypes.GET_USER,
  async (userID) => {
    return await userService.getUser(userID)
  }
)

export const editUserAsync = createAsyncThunk(
  actionTypes.EDIT_PROFILE,
  async (user) => {
    return await userService.editProfile(user)
  }
)

// Add this new thunk for getting all users
export const getUsersAsync = createAsyncThunk(
  actionTypes.GET_USERS,
  async () => {
    return await userService.getUsers()
  }
)
