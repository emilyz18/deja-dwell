import React from 'react'
import './ApplicantCard.css'
import Button from '@mui/material/Button'

const ApplicantCard = ({ applicant, onReject, onAccept, onClick }) => {
  const { image, name, phoneNumber, email } = applicant

  // handleReject() and handleAccept() was modified using ChatGPT on Jun 5.
  // prompt: "code in this file" + how to exempt the accept and reject button from being clicked,
  // so that the popup does not open if I click on those buttons.
  // I followed the prompt to add event.stopPropagation() to both functions
  const handleReject = (event) => {
    event.stopPropagation() // Prevent event bubbling to the card click handler
    onReject(name)
  }

  const handleAccept = (event) => {
    event.stopPropagation() // Prevent event bubbling to the card click handler
    onAccept(name)
  }

  return (
    <div className="applicant-card" onClick={onClick}>
      <div className="applicant-image">
        <img src={image} alt={`${name}'s profile`} />
      </div>
      <div className="applicant-info">
        <h3>{name}</h3>
        <p>Phone number: {phoneNumber}</p>
        <p>Email: {email}</p>
      </div>
      <div className="applicant-actions">
        <Button
          className="accept-button"
          color="success"
          onClick={handleAccept}
        >
          Accept
        </Button>
        <Button className="reject-button" color="error" onClick={handleReject}>
          Reject
        </Button>
      </div>
    </div>
  )
}

export default ApplicantCard
