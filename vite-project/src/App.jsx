import './css/App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LandlordPropertyCard from './components/landlordPropertyCard/LandlordPropertyCard';
import PropertyCardList from './components/propertyCardList/PropertyCardList';
import { LandLordSideBar } from './components/sideBars/LandLordSideBar';
import { TenantSideBar } from './components/sideBars/TenantSideBar';
import { TenantProfilePage } from './InputForms/tenant/tenantProfilePage';
import { PropertyEditPage } from './InputForms/property/PropertyEditPage';
import { GeneralInputForm } from './InputForms/generalInputForm';
import History from './components/history/History';
import SignIn from './components/userLogin/SignIn';
import SignUp from './components/userLogin/SignUp';
import ProtectedRoute from './components/userLogin/ProtectedRoute';
import { verifySessionAsync } from './redux/user/thunks';

const LANDLORD = 'landlord';
const TENANT = 'tenant';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const requestState = useSelector((state) => state.user.requestState);
  const [accountType, setAccountType] = useState(LANDLORD);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'; 
  useEffect(() => {
    if (!isAuthPage) {
      dispatch(verifySessionAsync());
      console.log("verify session");
    }
  }, [isAuthPage,dispatch]);

  useEffect(() => {
    if (location.pathname.startsWith('/landlordAccount')) {
      setAccountType(LANDLORD);
    } else {
      setAccountType(TENANT);
    }
  }, [location.pathname]);

  if (requestState === 'PENDING') {
    return <div><h1>Loading you information...</h1></div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
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
                  {accountType === LANDLORD && (
                    <>
                      <Route path="/landlordAccount/applicants" element={<LandlordPropertyCard landlordId={user?.LandlordID} />} />
                      <Route path="/landlordAccount/profile" element={<GeneralInputForm />} />
                      <Route path="/landlordAccount/property" element={<PropertyEditPage />} />
                    </>
                  )}
                  {accountType === TENANT && (
                    <>
                      <Route path="/tenantAccount/matches" element={<PropertyCardList searchMode={false} />} />
                      <Route path="/tenantAccount/search" element={<PropertyCardList searchMode={true} />} />
                      <Route path="/tenantAccount/profile" element={<GeneralInputForm />} />
                      <Route path="/tenantAccount/preference" element={<TenantProfilePage />} />
                      <Route path="/tenantAccount/history" element={<History tenantId={user?.TenantID} />} />
                    </>
                  )}
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
