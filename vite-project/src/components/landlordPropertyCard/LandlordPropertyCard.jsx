import React, { useState } from "react";
import Carousel from "../carousel/Carousel";
import "./LandlordPropertyCard.css"; // Import the CSS file
import ApplicantCard from "../applicantCard/ApplicantCard";

const LandlordPropertyCard = ({ postingData }) => {
    const { house, applicants: initialApplicants} = postingData;
    const { images, title, description } = house;

    const [applicants, setApplicants] = useState(initialApplicants);

    const handleRejectApplicant = (name) => {
      setApplicants(applicants.filter(applicant => applicant.name !== name));
    };

    const handleAcceptApplicant = (name) => {
        const acceptedApplicant = applicants.find(applicant => applicant.name === name);
        setApplicants([acceptedApplicant]);
      };
    

  return (
    <>
    <div className="landlord-property-card"> 
      <div className="carousel-container">
        <Carousel data={images} size={{ width: "400px", height: "240px" }} /> {/*Height must match property-information in LandlordPropertyCard.css */}
      </div>
      <div className="property-information">
         <h3>{title}</h3> 
        <p>{description}</p>
      </div>
    </div>
    <div className="applicant-list">
        {applicants.map((applicant, index) => (
           <ApplicantCard
           key={index}
           applicant={applicant}
           onReject={handleRejectApplicant}
           onAccept={handleAcceptApplicant}
         />
        ))}
      </div>
    </>
  );
};

export default LandlordPropertyCard;
