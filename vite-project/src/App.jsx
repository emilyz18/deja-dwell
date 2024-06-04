/*
import "./App.css";
function App() {

  return (
    <>
    </>
  );
}

export default App;
*/


// uncomment the lines below to view landlord dashboard:
/*
import "./App.css";
import LandlordPropertyCard from "./components/landlordPropertyCard/LandlordPropertyCard";
import { postingData } from "./mockData/postingData";
function App() {

return (
 <>
   <LandlordPropertyCard postingData={postingData}/>
   </>
  );
 }

 export default App;
*/





// uncomment the lines below to view Mini property card:
/*
import "./App.css";
import PropertyCardList from "./components/propertyCardList/PropertyCardList";
import { propertyList } from "./mockData/postingData";
function App() {

return (
 <>
   <PropertyCardList propList={propertyList.propertys}/>
   </>
  );
 }

 export default App;


*/
// uncomment the lines below to view landlord dashboard:

import "./css/App.css";
import LandlordPropertyCard from "./components/landlordPropertyCard/LandlordPropertyCard";
import { LandLordSideBar } from "./components/sideBars/landLordSideBar";
import { TenantSideBar } from "./components/sideBars/tenantSideBar";
import { postingData } from "./mockData/postingData";
import { mockUser } from "./mockData/mockUser";
import PropertyCardList from "./components/propertyCardList/PropertyCardList";
import { propertyList } from "./mockData/postingData";
import { useState } from "react";

const LANDLORD = "landlord"
const TENANT = "tenant"

function App() {
  const [accountType, setAccountType] = useState(LANDLORD);

  function handleSwitchAcc() {
    if (accountType === LANDLORD) {
      setAccountType(TENANT);
    } else {
      setAccountType(LANDLORD);
    }
  }

  return (
    <>
      <div className="root">
        {accountType === 'landlord' ? (
          <>
            <LandLordSideBar accountType={accountType} profile={mockUser} onSwitchAcc={handleSwitchAcc} />
            <LandlordPropertyCard postingData={postingData} />
          </>
        ) : (
          <>
            <TenantSideBar accountType={accountType} profile={mockUser} onSwitchAcc={handleSwitchAcc} />
            <PropertyCardList propList={propertyList.propertys}/>
          </>
        )}
      </div>
    </>
  );
}

export default App;
