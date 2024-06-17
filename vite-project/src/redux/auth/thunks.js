import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import authService from './service';

export const signInAsync = createAsyncThunk(
    actionTypes.SIGN_IN,
    async (user) => {
        return await authService.signIn(user);
    }
);

export const signUpAsync = createAsyncThunk(
    actionTypes.SIGN_UP,
    async (user) => {
        return await authService.signUp(user);
    }
);

