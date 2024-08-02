import React from 'react'
import './ExpandedApplicantCard.css'

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
    startDate,
    endDate,
    earlyBirdNightOut,
    financialSituation,
  } = applicant

  const formatDate = (date) => {
    if (!date) return ''
    return date.split('T')[0]
  }

  return (
    <div className="member-popup">
      <img src={image} alt={`${name}'s profile`} className="profile-image" />
      <div className="expanded-name">
        <h2>{name}</h2>
      </div>
      <div className="expanded-information">
        <div className="info-grid">
          <InfoItem label="Gender" value={gender} />
          <InfoItem label="Phone #" value={phoneNumber} />
          <InfoItem label="Email" value={email} />
          <InfoItem label="Age" value={age} />
          <InfoItem label="Start Date" value={formatDate(startDate)} />
          <InfoItem label="End Date" value={formatDate(endDate)} />
          <InfoItem label="Occupation" value={occupation} />
          <InfoItem label="Financial Situation" value={financialSituation} />
          <InfoItem label="Family Size" value={familySize} />
          <InfoItem label="Habit" value={earlyBirdNightOut} />
        </div>
      </div>
    </div>
  )
}

const InfoItem = ({ label, value }) => (
  <div className="info-item">
    <span className="label">{label}</span>
    <span className="value">{value}</span>
  </div>
)

export default ExpandedApplicantCard
