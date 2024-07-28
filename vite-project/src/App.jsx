import './css/App.css'

import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import LandlordPropertyCard from './components/landlordPropertyCard/LandlordPropertyCard'
import PropertyCardList from './components/propertyCardList/PropertyCardList'
import { LandLordSideBar } from './components/sideBars/LandLordSideBar'
import { TenantSideBar } from './components/sideBars/TenantSideBar'
import {TenantEditPage } from './InputForms/tenant/TenantEditPage.jsx'
import { PropertyEditPage } from './InputForms/property/PropertyEditPage.jsx'
import { GeneralInputForm } from './InputForms/generalInputForm'
import History from './components/history/History'

import { getUserAsync } from './redux/user/thunks'

const LANDLORD = 'landlord'
const TENANT = 'tenant'

function App() {
  const [accountType, setAccountType] = useState(LANDLORD)
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const userId = user.UserID

  useEffect(() => {
    if (user) {
      if (userId) {
        dispatch(getUserAsync(userId))
      }
    }
  }, []) // FYI: if I add dispatch and user in here it will infinitely call the GET request

  const landlordId = user.LandlordID

  // useEffect Hook to set Initial State Based on the URL
  useEffect(() => {
    if (location.pathname.startsWith('/landlordAccount')) {
      setAccountType(LANDLORD)
    } else {
      setAccountType(TENANT)
    }
  }, [location.pathname])

  return (
    <div className="root">
      <div id="main-sidebar-container">
        {accountType === LANDLORD ? (
          <LandLordSideBar accountType={accountType} profile={user} />
        ) : (
          <TenantSideBar accountType={accountType} profile={user} />
        )}
      </div>
      <div className="main-content">
        <Routes>
          {accountType === LANDLORD ? (
            <>
              <Route
                path="/"
                element={<LandlordPropertyCard landlordId={landlordId} />}
              />
              <Route
                path="/landlordAccount/applicants"
                element={<LandlordPropertyCard landlordId={landlordId} />}
              />
              <Route
                path="/landlordAccount/profile"
                element={<GeneralInputForm />}
              />
              <Route
                path="/landlordAccount/property"
                element={<PropertyEditPage />}
              />
            </>
          ) : (
            <>
              <Route
                path="/tenantAccount/matches"
                element={<PropertyCardList searchMode={false} />}
              />
              <Route
                path="/tenantAccount/search"
                element={<PropertyCardList searchMode={true} />}
              />
              <Route
                path="/tenantAccount/profile"
                element={<GeneralInputForm />}
              />
              <Route
                path="/tenantAccount/preference"
                element={<TenantEditPage />}
              />
              <Route
                path="/tenantAccount/history"
                element={<History tenantId={user.TenantID} />}
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  )
}

export default App
