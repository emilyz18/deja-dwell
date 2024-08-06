import React from 'react'
import './ApplicantCard.css'
import Button from '@mui/material/Button'

const ApplicantCard = ({ applicant, onReject, onAccept, onClick }) => {
  const { image, name, phoneNumber, email, matchStatus } = applicant

  const handleReject = (event) => {
    event.stopPropagation() // Prevent event bubbling to the card click handler
    onReject(name)
  }

  const handleAccept = (event) => {
    event.stopPropagation() // Prevent event bubbling to the card click handler
    onAccept(name)
  }

  return (
    <div className={`applicant-card ${matchStatus === 'Accepted' ? 'accepted' : ''}`} onClick={onClick}>
      <div className="applicant-image">
        <img src={image} alt={`${name}'s profile`} />
      </div>
      <div className="applicant-info">
        <h3>{name}</h3>
        <p>
          <span>Phone Number:</span> {phoneNumber}
        </p>
        <p>
          <span>Email:</span> {email}
        </p>
      </div>
      {matchStatus !== 'Accepted' && (
        <div className="applicant-actions">
          <Button className="accept-button" onClick={handleAccept}>
            Accept
          </Button>
          <Button className="reject-button" onClick={handleReject}>
            Reject
          </Button>
        </div>
      )}
      {matchStatus === 'Accepted' && <div className="accepted-label">Accepted</div>}
    </div>
  )
}

export default ApplicantCard
