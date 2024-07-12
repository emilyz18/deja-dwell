import axios from 'axios'

const URL_PATH = 'http://localhost:3000/properties'

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

const addProperty = async (property) => {
  return handleResponse(() => axios.post(URL_PATH, property))
}

const getProperties = async () => {
  return handleResponse(() => axios.get(URL_PATH + '/getProperties'))
}

const getPropertyById = async (propertyId) => {
  return handleResponse(() => axios.get(`${URL_PATH}/getPropertyById/${propertyId}`))
}

const getUnMatchedProperties = async (tenantId) => {
  return handleResponse(() => axios.get(URL_PATH + `/unmatchedProperties/${tenantId}`))
}

const deleteProperty = async (propertyId) => {
  await handleResponse(() => axios.delete(`${URL_PATH}/${propertyId}`))
  return propertyId
}

const patchProperty = async ({ HouseID, property }) => {
  return handleResponse(() =>
    axios.patch(`${URL_PATH}/patchProperty/${HouseID}`, property)
  )
}

const putProperty = async (property) => {
  return handleResponse(() => axios.put(`${URL_PATH}/${property.id}`, property))
}

export default {
  addProperty,
  getProperties,
  deleteProperty,
  patchProperty,
  putProperty,
  getUnMatchedProperties,
  getPropertyById
}
