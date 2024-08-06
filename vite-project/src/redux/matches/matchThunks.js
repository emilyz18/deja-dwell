import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createMatch,
  deleteMatch,
  getLandlordMatches,
  getTenantMatches,
  reopenMatches,
  updateMatch,
} from './matchService'
import { actionTypes } from './actionTypes'

export const createMatchAsync = createAsyncThunk(actionTypes.CREATE_MATCH, async (matchData) => {
  return await createMatch(matchData)
})

export const updateMatchAsync = createAsyncThunk(actionTypes.UPDATE_MATCH, async ({ matchId, matchData }) => {
  return await updateMatch(matchId, matchData)
})

export const deleteMatchAsync = createAsyncThunk(actionTypes.DELETE_MATCH, async (matchId) => {
  return await deleteMatch(matchId)
})

export const getLandlordMatchesAsync = createAsyncThunk(actionTypes.GET_LANDLORD_MATCHES, async (landlordId) => {
  return await getLandlordMatches(landlordId)
})

export const getTenantMatchesAsync = createAsyncThunk(actionTypes.GET_TENANT_MATCHES, async (tenantId) => {
  return await getTenantMatches(tenantId)
})

export const reopenMatchesAsync = createAsyncThunk(actionTypes.REOPEN_MATCHES, async (matchId) => {
  return await reopenMatches(matchId)
})
