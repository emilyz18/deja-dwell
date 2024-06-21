import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import {
    getMatchesAsync,
    createMatchAsync,
    updateMatchAsync,
    deleteMatchAsync
} from './matchThunks';

const INITIAL_STATE = {
    list: [],
    error: null,
    getMatches: REQUEST_STATE.IDLE,
    createMatch: REQUEST_STATE.IDLE,
    updateMatch: REQUEST_STATE.IDLE,
    deleteMatch: REQUEST_STATE.IDLE,
};

const matchSlice = createSlice({
    name: 'matches',
    initialState: INITIAL_STATE,
    reducers: {
        // Update specific match in the state
        updateMatch: (state, action) => {
            const index = state.list.findIndex(match => match.MatchID === action.payload.MatchID);
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...action.payload };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // GET Matches
            .addCase(getMatchesAsync.pending, (state) => {
                state.getMatches = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getMatchesAsync.fulfilled, (state, action) => {
                state.getMatches = REQUEST_STATE.FULFILLED;
                state.list = action.payload;
            })
            .addCase(getMatchesAsync.rejected, (state, action) => {
                state.getMatches = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })

            // CREATE Match
            .addCase(createMatchAsync.pending, (state) => {
                state.createMatch = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(createMatchAsync.fulfilled, (state, action) => {
                state.createMatch = REQUEST_STATE.FULFILLED;
                state.list.push(action.payload);
            })
            .addCase(createMatchAsync.rejected, (state, action) => {
                state.createMatch = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })

            // UPDATE Match
            .addCase(updateMatchAsync.pending, (state) => {
                state.updateMatch = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(updateMatchAsync.fulfilled, (state, action) => {
                state.updateMatch = REQUEST_STATE.FULFILLED;
                const index = state.list.findIndex(match => match.MatchID === action.payload.MatchID);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateMatchAsync.rejected, (state, action) => {
                state.updateMatch = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })

            // DELETE Match
            .addCase(deleteMatchAsync.pending, (state) => {
                state.deleteMatch = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteMatchAsync.fulfilled, (state, action) => {
                state.deleteMatch = REQUEST_STATE.FULFILLED;
                state.list = state.list.filter(match => match.MatchID !== action.payload);
            })
            .addCase(deleteMatchAsync.rejected, (state, action) => {
                state.deleteMatch = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            });
    },
});

export const { updateMatch } = matchSlice.actions;
export default matchSlice.reducer;
