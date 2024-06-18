import axios from 'axios';

const URL_PATH = 'http://localhost:3000/user';

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

const signIn = async (user) => {
  return handleResponse(() => axios.post(URL_PATH + '/login', {user}));
};

const signUp = async (user) => {
  return handleResponse(() => axios.post(URL_PATH + '/register', {user}));
};

export default {
  signIn,
  signUp
};
