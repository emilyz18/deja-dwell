import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from './properties/reducer'
import usersReducer from './users/reducer'
import userReducer from './user/reducer'
import tenantPrefReducer from './tenant/tenantReducer'
import matchReducer from './matches/matchReducer'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    users: usersReducer,
    user: userReducer,
    tenant: tenantPrefReducer,
    matches: matchReducer,
  },
  devTools: true,
})
