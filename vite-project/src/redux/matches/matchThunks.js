import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createMatch,
  updateMatch,
  deleteMatch,
  getLandlordMatches,
  getTenantMatches,
  reopenMatches,
} from './matchService'
import { actionTypes } from './actionTypes'

export const createMatchAsync = createAsyncThunk(
  actionTypes.CREATE_MATCH,
  async (matchData) => {
    const response = await createMatch(matchData)
    return response
  }
)

export const updateMatchAsync = createAsyncThunk(
  actionTypes.UPDATE_MATCH,
  async ({ matchId, matchData }) => {
    const response = await updateMatch(matchId, matchData)
    return response
  }
)

export const deleteMatchAsync = createAsyncThunk(
  actionTypes.DELETE_MATCH,
  async (matchId) => {
    const response = await deleteMatch(matchId)
    return response
  }
)

export const getLandlordMatchesAsync = createAsyncThunk(
  actionTypes.GET_LANDLORD_MATCHES,
  async (landlordId) => {
    const response = await getLandlordMatches(landlordId)
    return response
  }
)

export const getTenantMatchesAsync = createAsyncThunk(
  actionTypes.GET_TENANT_MATCHES,
  async (tenantId) => {
    const response = await getTenantMatches(tenantId)
    return response
  }
)

export const reopenMatchesAsync = createAsyncThunk(
  actionTypes.REOPEN_MATCHES,
  async (matchId) => {
    const response = await reopenMatches(matchId)
    return response
  }
)