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
    async ({ tenantID, tenant }) => {
        console.log('patch tenant profile:');
        return await tenantService.patchTenantProfile(tenantID, tenant);
    }
);

export const getTenantPrefAsync = createAsyncThunk(
    actionTypes.GET_Tenant_PREF,
    async (tenantPreferenceID) => {
        const response = await tenantService.getTenantPref(tenantPreferenceID);
        // console.log('!!!Fetched tenant pref:', response);
        return response;
    }
);

export const patchTenantPrefAsync = createAsyncThunk(
    actionTypes.PATH_Tenant_PREF,
    async ({ tenantPreferenceID, tenantPref }) => {
        console.log('patch tenant pref:');
        return await tenantService.patchTenantPref(tenantPreferenceID, tenantPref);
    }
);
