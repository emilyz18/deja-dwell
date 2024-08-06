import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import landlordService from './service'

export const getLandlordAsync = createAsyncThunk(actionTypes.GET_LANDLORD, async (landlordID) => {
  return await landlordService.getLandlord(landlordID)
})

export const createLandlordAsync = createAsyncThunk(actionTypes.CREATE_LANDLORD, async (landlordData) => {
  return await landlordService.createLandlord(landlordData)
})
