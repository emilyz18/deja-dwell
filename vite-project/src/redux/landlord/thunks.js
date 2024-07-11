import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import userService from './service'


export const getLandlordAsync = createAsyncThunk(
  actionTypes.GET_LANDLORD,
  async (landlordID) => {
    return await userService.getLandlord(landlordID)
  }
)
