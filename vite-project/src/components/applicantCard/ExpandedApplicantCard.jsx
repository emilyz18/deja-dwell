import "./ExpandedApplicantCard.css";
import Button from "@mui/material/Button";

const ExpandedApplicantCard = ({ applicant, onClose }) => {
  const {
    name,
    image,
    phoneNumber,
    email,
    gender,
    age,
    familySize,
    occupation,
    lengthOfLease,
    earlyBirdNightOut,
    financialSituation,
  } = applicant;

  return (
    <div className="member-popup">
      <img src={image} alt={`${name}'s profile`} />
      <h2>{name}</h2>
      <p>Gender: {gender} </p>
      <p>Phone #: {phoneNumber} </p>
      <p>Email: {email} </p>
      <p>Age {age}</p>
      <p>Family Size: {familySize} </p>
      <p>Occupation: {occupation}</p>
      <p>Length of Lease: {lengthOfLease}</p>
      <p>Habbit: {earlyBirdNightOut}</p>
      <p>Financial Situation: {financialSituation}</p>
      <Button onClick={onClose} color="error">
        Reject
      </Button>
    </div>
  );
};

export default ExpandedApplicantCard;
