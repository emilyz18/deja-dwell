import { slides } from "../../mockData/carouselImages";
import Carousel from "../carousel/Carousel";
import "./LandlordPropertyCard.css"; // Import the CSS file

const LandlordPropertyCard = ({ cardData }) => {
  const { title, description } = cardData; // TODO: need better data scheme later

  return (
    <div className="landlord-property-card"> 
      <div className="carousel-container">
        <Carousel data={slides} size={{ width: "400px", height: "240px" }} /> {/*Height must match property-information in LandlordPropertyCard.css */}
      </div>
      <div className="property-information">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LandlordPropertyCard;
