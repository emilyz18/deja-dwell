import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from './properties/reducer'
import usersReducer from './users/reducer'
import userReducer from './user/reducer'
import tenantPrefReducer from './tenant/tenantReducer'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,

    users: usersReducer,
    user: userReducer,
    tenant: tenantPrefReducer,
  },
  devTools: true,
})
