import React, { useState, useEffect } from 'react'
import Carousel from '../carousel/Carousel'
import './LandlordPropertyCard.css' // Import the CSS file
import ApplicantCard from '../applicantCard/ApplicantCard'
import ExpandedApplicantCard from '../applicantCard/ExpandedApplicantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertiesAsync } from '../../redux/properties/thunks'

const LandlordPropertyCard = ({ landlordId }) => {
  const dispatch = useDispatch()
  const properties = useSelector((state) => state.properties.list)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const initialApplicants = [
    // This is a boilerplate. Replace it with actual data fetching logic.
    {
      name: 'John Doe',
      image: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      phoneNumber: '555-123-4567',
      email: 'john.doe@example.com',
      gender: 'male',
      age: '30',
      familySize: 2,
      occupation: 'Software Engineer',
      lengthOfLease: 'Sept 2024 to Dec 2024',
      earlyBirdNightOut: 'Early bird',
      financialSituation: 'Stable income, good credit',
    },
    // Add more applicant objects here
  ]

  const [applicants, setApplicants] = useState(initialApplicants)
  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  useEffect(() => {
    dispatch(getPropertiesAsync())
  }, [dispatch])

  useEffect(() => {
    if (properties.length > 0) {
      const property = properties.find((prop) => prop.LandlordID === landlordId)
      setSelectedProperty(property)
    }
  }, [properties, landlordId])

  const handleRejectApplicant = (name) => {
    setApplicants(applicants.filter((applicant) => applicant.name !== name))
  }

  const handleAcceptApplicant = (name) => {
    const acceptedApplicant = applicants.find(
        (applicant) => applicant.name === name
    )
    setApplicants([acceptedApplicant])
  }

  const handleClosePopup = () => {
    setPopupVisible(false)
  }

  const handleCardClick = (applicant) => {
    setSelectedApplicant(applicant)
    setPopupVisible(true)
  }

  if (!selectedProperty) {
    return <div>Loading...</div>
  }

  const {
    HouseImgs: images,
    Title: title,
    Description: description,
    Street: address,
    ExpectedPrice: price,
    RoomType: roomType,
    NumOfParking: parkingAvailability,
  } = selectedProperty

  return (
      <>
        <div className="landlord-dashboard-display">
          <div className="landlord-property-card">
            <div className="landlord-carousel-container">
              <Carousel
                  data={images}
                  size={{ width: '400px', height: '240px' }}
              />
            </div>
            <div className="property-information">
              <h3>{title}</h3>
              <div className="property-description">
                <p>Address: {address}</p>
                <p>Price: ${price} per month</p>
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
                    onClick={() => handleCardClick(applicant)}
                />
            ))}
          </div>
          {popupVisible && (
              <ExpandedApplicantCard
                  applicant={selectedApplicant}
                  onClose={handleClosePopup}
              />
          )}
        </div>
      </>
  )
}

export default LandlordPropertyCard
