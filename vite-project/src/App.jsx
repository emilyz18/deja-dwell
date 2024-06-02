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

