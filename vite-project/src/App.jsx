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
import MiniPropertyCard from "./components/miniPropertyCard/MiniPropertyCard";
import { house1 } from "./mockData/postingData";
function App() {

return (
 <>
   <MiniPropertyCard propertyInfo={house1}/>
   </>
  );
 }

 export default App;

