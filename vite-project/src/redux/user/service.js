import axios from 'axios'

const URL_PATH = '/api/user'

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

const signIn = async (user) => {
  return handleResponse(() => axios.post(URL_PATH + '/login', { user }))
}

const signUp = async (user) => {
  return handleResponse(() => axios.post(URL_PATH + '/register', { user }))
}

const editProfile = async (user) => {
  return handleResponse(() => axios.patch(URL_PATH + '/edit', { user }))
}

const getUser = async (userID) => {
  return handleResponse(() => axios.get(URL_PATH + `/${userID}`))
}

const getUsers = async () => {
  return handleResponse(() => axios.get(URL_PATH))
}

export default {
  signIn,
  signUp,
  getUser,
  editProfile,
  getUsers,
}
