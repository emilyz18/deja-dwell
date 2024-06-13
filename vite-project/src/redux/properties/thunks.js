import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import propertiesService from './service';

export const getPropertiesAsync = createAsyncThunk(
    actionTypes.GET_properties,
    async () => {
        return await propertiesService.getProperties();
    }
);