import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import userService from './service'

export const getUsersAsync = createAsyncThunk(
  actionTypes.GET_USERS,
  async () => {
    return await userService.getUsers()
  }
)

export const getUserByIdAsync = createAsyncThunk(
  actionTypes.GET_USERSBYID,
  async () => {
    return await userService.getUserById()
  }
)

export const addUserAsync = createAsyncThunk(
  actionTypes.ADD_USER,
  async (user) => {
    return await userService.addUser(user)
  }
)

export const deleteUserAsync = createAsyncThunk(
  actionTypes.DELETE_USER,
  async (userId) => {
    return await userService.deleteUser(userId)
  }
)

export const putUserAsync = createAsyncThunk(
  actionTypes.PUT_USER,
  async (user) => {
    return await userService.putUser(user)
  }
)

export const patchUserAsync = createAsyncThunk(
  actionTypes.PATCH_USER,
  async (user) => {
    return await userService.patchUser(user)
  }
)
