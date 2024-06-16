import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './properties/reducer';
import usersReducer from './users/reducer';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer, usersReducer
  },
  devTools: true
});