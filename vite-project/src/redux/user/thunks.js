import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import userService from './service';

export const signInAsync = createAsyncThunk(
    actionTypes.SIGN_IN,
    async (user) => {
        return await userService.signIn(user);
    }
);

export const signUpAsync = createAsyncThunk(
    actionTypes.SIGN_UP,
    async (user) => {
        return await userService.signUp(user);
    }
);

