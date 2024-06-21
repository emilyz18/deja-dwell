import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMatches, createMatch, updateMatch, deleteMatch } from './matchService';
import { actionTypes } from './actionTypes';

export const getMatchesAsync = createAsyncThunk(
    actionTypes.GET_MATCHES,
    async () => {
        const response = await getMatches();
        return response;
    }
);

export const createMatchAsync = createAsyncThunk(
    actionTypes.CREATE_MATCH,
    async (matchData) => {
        const response = await createMatch(matchData);
        return response;
    }
);

export const updateMatchAsync = createAsyncThunk(
    actionTypes.UPDATE_MATCH,
    async ({ matchId, matchData }) => {
        const response = await updateMatch(matchId, matchData);
        return response;
    }
);

export const deleteMatchAsync = createAsyncThunk(
    actionTypes.DELETE_MATCH,
    async (matchId) => {
        const response = await deleteMatch(matchId);
        return response;
    }
);
