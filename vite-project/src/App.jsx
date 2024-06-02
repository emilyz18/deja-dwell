// import "./App.css";
// function App() {

//   return (
//     <>
//     </>
//   );
// }

// export default App;



// uncomment the lines below to view landlord dashboard:

import "./App.css";
import LandlordPropertyCard from "./components/landlordPropertyCard/LandlordPropertyCard";
import { LandLordSideBar } from "./components/sideBars/landLordSideBar";
import { postingData } from "./mockData/postingData";
import { mockUser } from "./mockData/mockUser";

function App() {

  return (
    <>
      <div className="root">
        <LandLordSideBar profile={mockUser} />
        <LandlordPropertyCard postingData={postingData} />
      </div>
      
    
    </>
  );
}

export default App;

