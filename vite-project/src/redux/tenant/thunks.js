import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import tenantService from './service'

export const getAllTenantProfileAsync = createAsyncThunk(actionTypes.GET_ALL_TENANT_PROFILE, async () => {
  // return await tenantService.getTenantProfile(tenantID);
  const response = await tenantService.getAllTenantProfile()
  // console.log('Fetched tenant profile:', response);
  return response
})

export const getTenantProfileAsync = createAsyncThunk(actionTypes.GET_TENANT_PROFILE, async (tenantID) => {
  const response = await tenantService.getTenantProfile(tenantID)
  return response
})

export const patchTenantProfileAsync = createAsyncThunk(
  actionTypes.PATCH_Tenant_PROFILE,
  async ({ tenantID, tenant }) => {
    return await tenantService.patchTenantProfile(tenantID, tenant)
  }
)

export const getAllTenantPrefAsync = createAsyncThunk(actionTypes.GET_ALL_Tenant_PREF, async () => {
  return await tenantService.getAllTenantPref()
})

export const getTenantPrefAsync = createAsyncThunk(actionTypes.GET_Tenant_PREF, async (tenantPreferenceID) => {
  // console.log('!!!Fetched tenant pref:', response);
  return await tenantService.getTenantPref(tenantPreferenceID)
})

export const patchTenantPrefAsync = createAsyncThunk(
  actionTypes.PATH_Tenant_PREF,
  async ({ tenantPreferenceID, tenantPref }) => {
    return await tenantService.patchTenantPref(tenantPreferenceID, tenantPref)
  }
)
