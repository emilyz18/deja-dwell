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

import "./App.css";
import LandlordPropertyCard from "./components/landlordPropertyCard/LandlordPropertyCard";
import { LandLordSideBar } from "./components/sideBars/landLordSideBar";
import { TenantSideBar } from "./components/sideBars/tenantSideBar";
import { postingData } from "./mockData/postingData";
import { mockUser } from "./mockData/mockUser";
import { useState } from "react";

function App() {

  const [accountType, setaccountType] = useState("landlord");

  function handleSwitchAcc() {
    if (accountType === "landlord") {
      setaccountType("tenant");
    } else {
      setaccountType("landlord");
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
            <TenantSideBar accountType={accountType} profile={mockUser} onSwitchAcc={handleSwitchAcc} />
            
        )}


       
      </div>
      
    
    </>
  );
}

export default App;

