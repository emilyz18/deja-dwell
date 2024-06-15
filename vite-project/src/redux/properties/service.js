import axios from 'axios';

const getProperties = async () => {
  const response = await axios.get('http://localhost:3000/properties/list');
  return response.data;
};

export default {
  getProperties
};
