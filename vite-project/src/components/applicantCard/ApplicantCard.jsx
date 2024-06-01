import React from "react";
import "./ApplicantCard.css"; // Ensure you create and style this CSS file accordingly

const ApplicantCard = ({ applicant, onReject, onAccept}) => {
  const { image, name, age} = applicant;

  const handleReject = () => {
    onReject(name);
  };
  
  const handleAccept = () => {
    onAccept(name);
  };

  return (
    <div className="applicant-card">
      <div className="applicant-image">
        <img src={image} alt={`${name}'s profile`} />
      </div>
      <div className="applicant-info">
        <h3>{name}</h3>
        <p>Age: {age}</p>
        <p>Phone #: {applicant.contactInformation.phoneNumber}</p>
      </div>
      <div className="applicant-actions">
        <button className="accept-button" onClick={handleAccept}>Accept</button>
        <button className="reject-button" onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};

export default ApplicantCard;
