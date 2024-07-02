import './css/App.css'

import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import LandlordPropertyCard from './components/landlordPropertyCard/LandlordPropertyCard'
import PropertyCardList from './components/propertyCardList/PropertyCardList'
import { LandLordSideBar } from './components/sideBars/LandLordSideBar'
import { TenantSideBar } from './components/sideBars/TenantSideBar'
import { TenantInputForm } from './InputForms/TenantInputForm.jsx'
import { GeneralInputForm } from './InputForms/generalInputForm'
import History  from './components/history/History'

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

  function handleSwitchAcc() {
    if (accountType === LANDLORD) {
      setAccountType(TENANT)
      navigate('/tenantAccount/matches')
    } else {
      setAccountType(LANDLORD)
      navigate('/landlordAccount/applicants')
    }
  }

  return (
    <div className="root">
      <div id="main-sidebar-container">
        {accountType === LANDLORD ? (
          <LandLordSideBar
            accountType={accountType}
            profile={user}
            onSwitchAcc={handleSwitchAcc}
          />
        ) : (
          <TenantSideBar
            accountType={accountType}
            profile={user}
            onSwitchAcc={handleSwitchAcc}
          />
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
            </>
          ) : (
            <>
              {/* <Route path="/" element={<PropertyCardList />} /> */}
              <Route
                path="/tenantAccount/matches"
                element={<PropertyCardList />}
              />
              <Route
                path="/tenantAccount/profile"
                element={<GeneralInputForm />}
              />
              <Route
                path="/tenantAccount/preference"
                element={<TenantInputForm />}
              />
              <Route
                path="/tenantAccount/history"
                element={<History tenantId={user.TenantID}/>}
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  )
}

export default App
