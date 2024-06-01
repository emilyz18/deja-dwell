import React, { useState } from "react";
import Carousel from "../carousel/Carousel";
import "./LandlordPropertyCard.css"; // Import the CSS file
import ApplicantCard from "../applicantCard/ApplicantCard";

const LandlordPropertyCard = ({ postingData }) => {
  const { house, applicants: initialApplicants } = postingData;
  const {
    images,
    title,
    description,
    address,
    price,
    roomType,
    parkingAvailability,
  } = house;

  const [applicants, setApplicants] = useState(initialApplicants);

  const handleRejectApplicant = (name) => {
    setApplicants(applicants.filter((applicant) => applicant.name !== name));
  };

  const handleAcceptApplicant = (name) => {
    const acceptedApplicant = applicants.find(
      (applicant) => applicant.name === name
    );
    setApplicants([acceptedApplicant]);
  };

  return (
    <>
      <div className="landlord-dashboard-display">
        <div className="landlord-property-card">
          <div className="carousel-container">
            <Carousel
              data={images}
              size={{ width: "400px", height: "240px" }}
            />{" "}
            {/*Height must match property-information in LandlordPropertyCard.css */}
          </div>
          <div className="property-information">
            <h3>{title}</h3>
            <div className="property-description">
              <p>Address: {address}</p>
              <p>Price: {price}</p>
              <p>Room Type: {roomType}</p>
              <p>Parking Availability: {parkingAvailability}</p>
              <p>{description}</p>
            </div>
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
      </div>
    </>
  );
};

export default LandlordPropertyCard;
