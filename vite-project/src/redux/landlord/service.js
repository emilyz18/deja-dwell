import axios from 'axios'

const URL_PATH = '/api/landlord'

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
const getLandlord = async (landlordID) => {
  return handleResponse(() => axios.get(URL_PATH + `/${landlordID}`))
}

export const createLandlord = async (landlordData) => {
  const response = await axios.post(`${URL_PATH}/createLandlord`, landlordData);
  return response.data;
};

export default {
  getLandlord, createLandlord
}
