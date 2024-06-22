import { createSlice } from '@reduxjs/toolkit';
import {
  getTenantPrefAsync,
  getTenantProfileAsync,
  patchTenantPrefAsync,
  patchTenantProfileAsync,
  getAllTenantProfileAsync,
  getAllTenantPrefAsync,
} from './thunks';
import { REQUEST_STATE } from '../utils';

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: {
    tenant: {},
    tenantPref: {},
    tenants: [],
    tenantPrefs: [],
    error: null,
    getTenantProfile: REQUEST_STATE.IDLE,
    getTenantPref: REQUEST_STATE.IDLE,
    patchTenantProfile: REQUEST_STATE.IDLE,
    patchTenantPref: REQUEST_STATE.IDLE,
    getAllTenantProfile: REQUEST_STATE.IDLE,
    getAllTenantPref: REQUEST_STATE.IDLE,
  },
  reducers: {
    // update the data
    updateTenant: (state, action) => {
      state.tenant = { ...state.tenant, ...action.payload };
    },
    updateTenantPref: (state, action) => {
      state.tenantPref = { ...state.tenantPref, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
        // get all tenant profiles
        .addCase(getAllTenantProfileAsync.fulfilled, (state, action) => {
          state.getAllTenantProfile = REQUEST_STATE.FULFILLED;
          state.tenants = action.payload;
        })
        .addCase(getAllTenantProfileAsync.pending, (state) => {
          state.getAllTenantProfile = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getAllTenantProfileAsync.rejected, (state, action) => {
          state.getAllTenantProfile = REQUEST_STATE.REJECTED;
          state.error = action.error.message;
        })
        // get all tenant preferences
        .addCase(getAllTenantPrefAsync.fulfilled, (state, action) => {
          state.getAllTenantPref = REQUEST_STATE.FULFILLED;
          state.tenantPrefs = action.payload;
        })
        .addCase(getAllTenantPrefAsync.pending, (state) => {
          state.getAllTenantPref = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getAllTenantPrefAsync.rejected, (state, action) => {
          state.getAllTenantPref = REQUEST_STATE.REJECTED;
          state.error = action.error.message;
        })
        // get tenant profile
        .addCase(getTenantProfileAsync.fulfilled, (state, action) => {
          state.getTenantProfile = REQUEST_STATE.FULFILLED;
          state.tenant = action.payload;
        })
        .addCase(getTenantProfileAsync.pending, (state) => {
          state.getTenantProfile = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getTenantProfileAsync.rejected, (state, action) => {
          state.getTenantProfile = REQUEST_STATE.REJECTED;
          state.error = action.error.message;
        })
        // get tenant preference
        .addCase(getTenantPrefAsync.fulfilled, (state, action) => {
          state.getTenantPref = REQUEST_STATE.FULFILLED;
          state.tenantPref = action.payload;
        })
        .addCase(getTenantPrefAsync.pending, (state) => {
          state.getTenantPref = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getTenantPrefAsync.rejected, (state, action) => {
          state.getTenantPref = REQUEST_STATE.REJECTED;
          state.error = action.error.message;
        })
        // patch tenant profile
        .addCase(patchTenantProfileAsync.fulfilled, (state, action) => {
          state.patchTenantProfile = REQUEST_STATE.FULFILLED;
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
        // patch tenant preference
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
