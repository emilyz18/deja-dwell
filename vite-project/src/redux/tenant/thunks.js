import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import tenantService from './service';


export const getTenantProfileAsync = createAsyncThunk(
    actionTypes.GET_Tenant_PROFILE,
    async (tenantID) => {
        // return await tenantService.getTenantProfile(tenantID);
        const response = await tenantService.getTenantProfile(tenantID);
        // console.log('Fetched tenant profile:', response);
        return response;
    }
);

export const patchTenantProfileAsync = createAsyncThunk(
    actionTypes.PATCH_Tenant_PROFILE,
    async ({ tenantID, updatedData }) => {
        return await tenantService.patchUser(tenantID, updatedData);
    }
);

export const getTenantPrefAsync = createAsyncThunk(
    actionTypes.GET_Tenant_PREF,
    async (tenantPreferenceID) => {
        const response = await tenantService.getTenantPref(tenantPreferenceID);
        console.log('!!!Fetched tenant pref:', response);
        return response;
    }
);

export const patchTenantPrefAsync = createAsyncThunk(
    actionTypes.PATH_Tenant_PREF,
    async ({ tenantPreferenceID, updatedData }) => {
        return await tenantService.patchTenantPref(tenantPreferenceID, updatedData);
    }
);
