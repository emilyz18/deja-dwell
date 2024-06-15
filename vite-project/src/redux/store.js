import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './properties/reducer';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer
  },
  devTools: true
});