import axios from 'axios'

const API_URL = 'http://localhost:3000/matches'

export const getMatches = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const createMatch = async (matchData) => {
  const response = await axios.post(API_URL, matchData)
  return response.data
}

export const updateMatch = async (matchId, matchData) => {
  try {
    const response = await axios.patch(`http://localhost:3000/matches/${matchId}`, matchData);
    return response.data;
  } catch (error) {
    console.error('Error updating match:', error);
    throw error; // Ensure to handle errors appropriately in your component
  }
}

export const deleteMatch = async (matchId) => {
  const response = await axios.delete(`${API_URL}/${matchId}`)
  return response.data
}
