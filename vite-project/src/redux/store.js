import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './properties/reducer';
import usersReducer from './users/reducer';
import userReducer from './user/reducer'
import singleUserReducer from './users/singleUserReducer';
import tenantPrefReducer from './tenant/tenantReducer';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,

    users: usersReducer,
    user: userReducer,
    singleUser: singleUserReducer,
    tenant: tenantPrefReducer,
  },
  devTools: true
});