import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './properties/reducer';
import usersReducer from './users/reducer';
import userReducer from './user/reducer'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer, 
    usersReducer, 
    user: userReducer
  },
  devTools: true
});