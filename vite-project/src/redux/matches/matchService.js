import axios from 'axios'

const API_URL = '/api/matches'

export const getMatches = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const createMatch = async (matchData) => {
  const response = await axios.post(API_URL, matchData)
  return response.data
}

export const updateMatch = async (matchId, matchData) => {
  const response = await axios.patch(`${API_URL}/${matchId}`, matchData)
  return response.data
}

export const deleteMatch = async (matchId) => {
  const response = await axios.delete(`${API_URL}/${matchId}`)
  return response.data
}
