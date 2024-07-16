import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from './properties/reducer'
import userReducer from './user/reducer'
import tenantPrefReducer from './tenant/tenantReducer'
import matchReducer from './matches/matchReducer'
import landlordReducer from './landlord/reducer'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    user: userReducer,
    tenant: tenantPrefReducer,
    matches: matchReducer,
    landlord: landlordReducer
  },
  devTools: true,
})
