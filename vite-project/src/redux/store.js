import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './properties/reducer';
import usersReducer from './users/reducer';
import singleUserReducer from './users/singleUserReducer';
import tenantPrefReducer from './tenantPref/tenantPrefReducer';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    users: usersReducer,
    singleUser: singleUserReducer,
    tenant: tenantPrefReducer,
  },
  devTools: true
});