import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import userService from './service'


export const getLandlordAsync = createAsyncThunk(
  actionTypes.GET_USER,
  async (landlordID) => {
    return await userService.getUser(landlordID)
  }
)
