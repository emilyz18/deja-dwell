import "./App.css";
import ApplicantCard from "./components/applicantCard/ApplicantCard";
import LandlordPropertyCard from "./components/landlordPropertyCard/LandlordPropertyCard";
import { postingData } from "./mockData/carouselImages";
function App() {

  return (
    <>

      Test
      <LandlordPropertyCard postingData={postingData}/>
    </>
  );
}

export default App;
