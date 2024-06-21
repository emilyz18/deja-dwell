import axios from 'axios'

const URL_PATH_profile = 'http://localhost:3000/tenantsprofile'
const URL_PATH_preference = 'http://localhost:3000/tenantspref'

const handleResponse = async (request) => {
  try {
    const response = await request()
    return response.data
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data?.message
      throw new Error(errorMsg)
    }
    throw error
  }
}

// get user by id for now, might be email if we have log in functionality
const getTenantProfile = async (tenantID) => {
  return handleResponse(() => axios.get(`${URL_PATH_profile}/${tenantID}`))
}

const getTenantPref = async (tenantPreferenceID) => {
  console.log('Calling API with tenantPreferenceID:', tenantPreferenceID) // Add this log
  return handleResponse(() =>
    axios.get(`${URL_PATH_preference}/${tenantPreferenceID}`)
  )
}

const patchTenantProfile = async (tenantID, tenant) => {
  return handleResponse(() =>
    axios.patch(`${URL_PATH_profile}/${tenantID}`, tenant)
  )
}

const patchTenantPref = async (preferenceID, tenantPref) => {
  return handleResponse(() =>
    axios.patch(`${URL_PATH_preference}/${preferenceID}`, tenantPref)
  )
}

export default {
  getTenantProfile,
  getTenantPref,
  patchTenantProfile,
  patchTenantPref,
}
