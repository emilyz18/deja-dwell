import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import propertiesService from './service'

export const getPropertiesAsync = createAsyncThunk(
  actionTypes.GET_PROPERTIES,
  async () => {
    return await propertiesService.getProperties()
  }
)

export const getUnmatchedPropertiesAsync = createAsyncThunk(
  actionTypes.GET_UNMATCHED_PROPERTIES,
  async (tenantID) => {
    return await propertiesService.getUnMatchedProperties(tenantID)
  }
)

export const getPreferPropertiesAsync = createAsyncThunk(
  actionTypes.GET_PREFER_PROPERTIES,
  async (tenantID) => {
    return await propertiesService.getPreferProperties(tenantID)
  }
)

export const addPropertyAsync = createAsyncThunk(
  actionTypes.ADD_PROPERTIES,
  async (property) => {
    return await propertiesService.addProperty(property)
  }
)

export const deletePropertyAsync = createAsyncThunk(
  actionTypes.DELETE_PROPERTY,
  async (propertyId) => {
    return await propertiesService.deleteProperty(propertyId)
  }
)

export const putPropertyAsync = createAsyncThunk(
  actionTypes.PUT_PROPERTY,
  async (property) => {
    return await propertiesService.putProperty(property)
  }
)

export const patchPropertyAsync = createAsyncThunk(
  actionTypes.PATCH_PROPERTY,
  async (property) => {
    return await propertiesService.patchProperty(property)
  }
)
