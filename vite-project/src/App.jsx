// useNavigate : from tutorial https://dev.to/salehmubashar/usenavigate-tutorial-react-js-aop
// June 6,  useEffect() and useLocation() is guided by Chatgpt 4.0o for statmanagment, with prompt code in this file + " When I am at /tenantAccount/matches then refresh the page, I  get a screen with the landlord side bar and blank page"

import "./css/App.css";
import * as React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect} from "react";

import LandlordPropertyCard from "./components/landlordPropertyCard/LandlordPropertyCard";
import PropertyCardList from "./components/propertyCardList/PropertyCardList";
import { LandLordSideBar } from "./components/sideBars/LandLordSideBar.jsx";
import { TenantSideBar } from "./components/sideBars/TenantSideBar.jsx";
import {LandlordInputForm} from "./InputForms/landlordInputForm/LandlordInputForm.jsx";
import {TenantInputForm} from "./InputForms/tenantInputForm/TenantInputForm.jsx";

import { postingData } from "./mockData/postingData";
import { mockUser } from "./mockData/mockUser";
import { propertyList } from "./mockData/postingData";

const LANDLORD = "landlord"
const TENANT = "tenant"

function App() {
  const [accountType, setAccountType] = useState(LANDLORD);
  const navigate = useNavigate();
  const location = useLocation(); //location: current location object,

  // useEffect Hook to set Initial State Based on the URL:
  useEffect(() => {
    if (location.pathname.startsWith("/landlordAccount")) {
      setAccountType(LANDLORD);
    } else {
      setAccountType(TENANT);
    }
  }, [location.pathname]); 

  function handleSwitchAcc() {
    if (accountType === LANDLORD) {
      setAccountType(TENANT);
      navigate("/tenantAccount/matches");
    } else {
      setAccountType(LANDLORD);
      navigate("/landlordAccount/applicants");
    }
    // navigate(accountType === LANDLORD ? "/tenantAccount/matches" : "/landlordAccount/applicants");
    
  }


  return (
    //<Router>
      <div className="root">
        {accountType === LANDLORD ? (
          <>
          <LandLordSideBar accountType={accountType} profile={mockUser} onSwitchAcc={handleSwitchAcc} />
          
          </>
        ) : (
          <TenantSideBar accountType={accountType} profile={mockUser} onSwitchAcc={handleSwitchAcc} />
        )}
        <Routes>
          {accountType === LANDLORD ? (
          <>
            {/* for now the home page is the applicates */}
              <Route path="/" element={<LandlordPropertyCard postingData={postingData} />} />
              <Route path="/landlordAccount/applicants" element={<LandlordPropertyCard postingData={postingData} />} />
              <Route path="/landlordAccount/profile" element={<LandlordInputForm />} />
            </>
          ) : (
              <>
                <Route path="/" element={<PropertyCardList propList={propertyList.propertys} />} />
                <Route path="/tenantAccount/matches" element={<PropertyCardList propList={propertyList.propertys} />} />
                <Route path="/tenantAccount/applicants" element={<TenantInputForm />} /> 
              </>
          )}
          
          
          
  
        </Routes>
      </div>
    //</Router>
  );
}

export default App;
