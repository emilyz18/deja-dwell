import React from "react";
import "./ApplicantCard.css"; // Ensure you create and style this CSS file accordingly
import Button from "@mui/material/Button";

const ApplicantCard = ({ applicant, onReject, onAccept, onClick }) => {
  const { image, name, phoneNumber, lengthOfLease, familySize } = applicant;

  const handleReject = (event) => {
    event.stopPropagation(); // Prevent event bubbling to the card click handler
    onReject(name);
  };

  const handleAccept = (event) => {
    event.stopPropagation(); // Prevent event bubbling to the card click handler
    onAccept(name);
  };

  return (
    <div className="applicant-card" onClick={onClick}>
      <div className="applicant-image">
        <img src={image} alt={`${name}'s profile`} />
      </div>
      <div className="applicant-info">
        <h3>{name}</h3>
        <p>Family Size: {familySize}</p>
        <p>Length of lease: {lengthOfLease}</p>
      </div>
      <div className="applicant-actions">
        <Button className="accept-button" color="success" onClick={handleAccept}>
          Accept
        </Button>
        <Button className="reject-button" color="error" onClick={handleReject}>
          Reject
        </Button>
      </div>
    </div>
  );
};

export default ApplicantCard;
