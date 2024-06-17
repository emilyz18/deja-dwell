import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './properties/reducer';
import usersReducer from './users/reducer';
import authReducer from './auth/reducer'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer, 
    usersReducer, 
    auth: authReducer
  },
  devTools: true
});