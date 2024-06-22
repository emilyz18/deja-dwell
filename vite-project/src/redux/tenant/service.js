import axios from 'axios';

const URL_PATH_PROFILE = 'http://localhost:3000/tenantsprofile';
const URL_PATH_PREFERENCE = 'http://localhost:3000/tenantspref';

const handleResponse = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data?.message;
      throw new Error(errorMsg);
    }
    throw error;
  }
};

// Get all tenant profiles
const getAllTenantProfile = async () => {
  return handleResponse(() => axios.get(`${URL_PATH_PROFILE}`));
};

// Get all tenant preferences
const getAllTenantPref = async () => {
  return handleResponse(() => axios.get(`${URL_PATH_PREFERENCE}`));
};

// Get tenant profile by ID
const getTenantProfile = async (tenantID) => {
  return handleResponse(() => axios.get(`${URL_PATH_PROFILE}/${tenantID}`));
};

// Get tenant preference by ID
const getTenantPref = async (tenantPreferenceID) => {
  return handleResponse(() => axios.get(`${URL_PATH_PREFERENCE}/${tenantPreferenceID}`));
};

// Patch tenant profile by ID
const patchTenantProfile = async (tenantID, tenant) => {
  return handleResponse(() => axios.patch(`${URL_PATH_PROFILE}/${tenantID}`, tenant));
};

// Patch tenant preference by ID
const patchTenantPref = async (preferenceID, tenantPref) => {
  return handleResponse(() => axios.patch(`${URL_PATH_PREFERENCE}/${preferenceID}`, tenantPref));
};

export default {
  getAllTenantProfile,
  getAllTenantPref,
  getTenantProfile,
  getTenantPref,
  patchTenantProfile,
  patchTenantPref,
};
