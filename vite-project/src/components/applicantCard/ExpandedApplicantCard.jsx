import './ExpandedApplicantCard.css';

const ExpandedApplicantCard = ({ applicant }) => {
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
            <img src={image} alt={`${name}'s profile`} className="profile-image" />
            <div className="expanded-name">
                <h2>{name}</h2>
            </div>
            <div className="expanded-information">
                <p>Gender: {gender}</p>
                <p>Phone #: {phoneNumber}</p>
                <p>Email: {email}</p>
                <p>Age: {age}</p>
                <p>Family Size: {familySize}</p>
                <p>Occupation: {occupation}</p>
                <p>Length of Lease: {lengthOfLease}</p>
                <p>Habit: {earlyBirdNightOut}</p>
                <p>Financial Situation: {financialSituation}</p>
            </div>
        </div>
    );
};

export default ExpandedApplicantCard;
