import { createSlice } from '@reduxjs/toolkit';
import { getTenantPrefAsync, getTenantProfileAsync, patchTenantPrefAsync, patchTenantProfileAsync } from './thunks';
import { REQUEST_STATE } from '../utils';

const tenantSlice = createSlice({
    name: 'tenant',
    initialState: {
        tenant: {},
        tenantPref: {},
        error: null,
        getTenantProfile: REQUEST_STATE.IDLE,
        getTenantPref: REQUEST_STATE.IDLE,
        patchTenantProfile: REQUEST_STATE.IDLE,
        patchTenantPref: REQUEST_STATE.IDLE,
    },
    reducers: {
        // update the data
        updateTenant: (state, action) => {
            state.tenant = { ...state.tenant, ...action.payload };
        },
        updateTenantPref: (state, action) => {
            state.tenantPref = { ...state.tenantPref, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            // get tenant profile
            .addCase(getTenantProfileAsync.fulfilled, (state, action) => {
                // console.log('getTenantProfileAsync fulfilled:', action.payload);
                state.getTenantProfile = REQUEST_STATE.FULFILLED;
                state.tenant = action.payload;
            })
            .addCase(getTenantProfileAsync.pending, (state) => {
                state.getTenantProfile = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getTenantProfileAsync.rejected, (state, action) => {
                // console.log('getTenantProfileAsync rejected:', action.error);
                state.getTenantProfile = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })
            // get pref
            .addCase(getTenantPrefAsync.fulfilled, (state, action) => {
                console.log('getTenantPrefAsync fulfilled:', action.payload);
                state.getTenantPref = REQUEST_STATE.FULFILLED;
                state.tenantPref = action.payload;
            })
            .addCase(getTenantPrefAsync.pending, (state) => {
                state.getTenantPref = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getTenantPrefAsync.rejected, (state, action) => {
                console.log('getTenantPrefAsync rejected:', action.error);
                state.getTenantPref = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })
            // update profile
            .addCase(patchTenantProfileAsync.fulfilled, (state, action) => {
                state.patchTenantProfile = REQUEST_STATE.FULFILLED;
                // console.log('patchTenantProfileAsync fullfilled:', action.payload);
                state.tenant = action.payload;
            })
            .addCase(patchTenantProfileAsync.pending, (state) => {
                state.patchTenantProfile = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(patchTenantProfileAsync.rejected, (state, action) => {
                state.patchTenantProfile = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            //update pref
            .addCase(patchTenantPrefAsync.fulfilled, (state, action) => {
                state.patchTenantPref = REQUEST_STATE.FULFILLED;
                state.tenantPref = action.payload;
            })
            .addCase(patchTenantPrefAsync.pending, (state) => {
                state.patchTenantPref = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(patchTenantPrefAsync.rejected, (state, action) => {
                state.patchTenantPref = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
        
    },
});

export const { updateTenant, updateTenantPref } = tenantSlice.actions;
export default tenantSlice.reducer;
