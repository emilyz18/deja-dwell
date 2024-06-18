import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import userService from './service';


export const getTanantByIdAsync = createAsyncThunk(
    actionTypes.GET_USERSBYID,
    async () => {
        return await userService.getUserById();
    }
);

export const patchUserAsync = createAsyncThunk(
    actionTypes.PATCH_USER,
    async (user) => {
        return await userService.patchUser(user);
    }
);
