// useNavigate : from tutorial https://dev.to/salehmubashar/usenavigate-tutorial-react-js-aop

/*
  June 6,  useEffect() and useLocation() is guided by Chatgpt 4.0o for state management, with prompt code in this file +
  "When I am at /tenantAccount/matches then refresh the page, I  get a screen with the landlord sidebar and blank page"
*/

import './css/App.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import LandlordPropertyCard from './components/landlordPropertyCard/LandlordPropertyCard'
import PropertyCardList from './components/propertyCardList/PropertyCardList'
import { LandLordSideBar } from './components/sideBars/LandLordSideBar.jsx'
import { TenantSideBar } from './components/sideBars/TenantSideBar.jsx'
import { LandlordInputForm } from './InputForms/landlordInputForm/LandlordInputForm.jsx'
import { TenantInputForm } from './InputForms/tenantInputForm/TenantInputForm.jsx'

import { mockUser, propertyList, postingData } from './mockData/mockUser'

const LANDLORD = 'landlord'
const TENANT = 'tenant'

function App() {
  const [accountType, setAccountType] = useState(LANDLORD)
  const navigate = useNavigate()
  const location = useLocation()

  // useEffect Hook to set Initial State Based on the URL:
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
    // navigate(accountType === LANDLORD ? "/tenantAccount/matches" : "/landlordAccount/applicants");
  }

  return (
    <>
      <div className="root">
        <div id="main-sidebar-container">
          {accountType === LANDLORD ? (
            <>
              <LandLordSideBar
                accountType={accountType}
                profile={mockUser}
                onSwitchAcc={handleSwitchAcc}
              />
            </>
          ) : (
            <TenantSideBar
              accountType={accountType}
              profile={mockUser}
              onSwitchAcc={handleSwitchAcc}
            />
          )}
        </div>
        <div className="main-content">
          <Routes>
            {accountType === LANDLORD ? (
              <>
                {/* for now the home page is the applicants */}
                <Route
                  path="/"
                  element={<LandlordPropertyCard postingData={postingData} />}
                />
                <Route
                  path="/landlordAccount/applicants"
                  element={<LandlordPropertyCard postingData={postingData} />}
                />
                <Route
                  path="/landlordAccount/profile"
                  element={<LandlordInputForm />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <PropertyCardList propList={propertyList.properties} />
                  }
                />
                <Route
                  path="/tenantAccount/matches"
                  element={
                    <PropertyCardList propList={propertyList.properties} />
                  }
                />
                <Route
                  path="/tenantAccount/applicants"
                  element={<TenantInputForm />}
                />
              </>
            )}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
