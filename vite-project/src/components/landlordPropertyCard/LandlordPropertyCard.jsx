import React, { useState, useEffect } from 'react'
import Carousel from '../carousel/Carousel'
import './LandlordPropertyCard.css' // Import the CSS file
import ApplicantCard from '../applicantCard/ApplicantCard'
import ExpandedApplicantCard from '../applicantCard/ExpandedApplicantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertiesAsync } from '../../redux/properties/thunks'
import { Snackbar, Alert } from '@mui/material'
import {
  getLandlordMatchesAsync,
  reopenMatchesAsync,
  updateMatchAsync,
} from '../../redux/matches/matchThunks'
import Button from '@mui/material/Button'

const LandlordPropertyCard = ({ landlordId }) => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.list);
  const getLandlordMatchesStatus = useSelector((state) => state.matches.getLandlordMatches);
  const landlordMatchesApplicants = useSelector((state) => state.matches.landlordMatches);
  const landlordID = useSelector((state) => state.user.user.LandlordID);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [applicants, setApplicants] = useState([]);
  const [hasAccepted, setHasAccept] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    if(getLandlordMatchesStatus === 'IDLE') {
      dispatch(getPropertiesAsync());
      dispatch(getLandlordMatchesAsync(landlordID));
    } else if (getLandlordMatchesStatus === 'FULFILLED') {
      setApplicants(landlordMatchesApplicants);
      if(landlordMatchesApplicants.some(applicant => applicant.matchStatus === 'Accepted')) {
        setHasAccept(true);
      } else {
        setHasAccept(false);
      }
    }
    console.log(applicants);
    console.log(hasAccepted);
  }, [getLandlordMatchesStatus,hasAccepted,dispatch])
  
  useEffect(() => {
    if (properties.length > 0) {
      const property = properties.find((prop) => prop.LandlordID === landlordId)
      setSelectedProperty(property)
    }
  }, [properties, landlordId])

  const handleRejectApplicant = (name) => {
    const rejectedApplicant = applicants.find(
      (applicant) => applicant.name === name
    )
    dispatch(
      updateMatchAsync({
        matchId: rejectedApplicant.matchID,
        matchData: {
          TenantID: rejectedApplicant.tenantID,
          LandlordID: rejectedApplicant.landlordID,
          HouseID: rejectedApplicant.houseID,
          MatchStatus: 'Rejected',
        },
      })
    )
    setNotification({
      open: true,
      message: `Rejected applicant: ${name}`,
      severity: 'error',
    })
  }

  const handleAcceptApplicant = (name) => {
    const acceptedApplicant = applicants.find(
      (applicant) => applicant.name === name
    )
    dispatch(
      updateMatchAsync({
        matchId: acceptedApplicant.matchID,
        matchData: {
          TenantID: acceptedApplicant.tenantID,
          LandlordID: acceptedApplicant.landlordID,
          HouseID: acceptedApplicant.houseID,
          MatchStatus: 'Accepted',
        },
      })
    )
    setNotification({
      open: true,
      message: `Accepted applicant: ${name}`,
      severity: 'success',
    })
  }

  const handleReopenMatch = () => {
    if(selectedProperty) {
      dispatch(
        reopenMatchesAsync(selectedProperty.HouseID)
      )
    }
  }

  const handleClosePopup = () => {
    setPopupVisible(false)
  }

  const handleCardClick = (applicant) => {
    setSelectedApplicant(applicant)
    setPopupVisible(true)
  }

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setNotification({ ...notification, open: false })
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
          {hasAccepted? <div>
          <Button className="reopen-button" color="error" onClick={handleReopenMatch}>
          Reopen Match
        </Button>
          </div> : null}
        </div>
        <div className="applicant-list">
          {applicants.length > 0 ? (
            applicants.map((applicant, index) => (
              <ApplicantCard
                key={index}
                applicant={applicant}
                onReject={handleRejectApplicant}
                onAccept={handleAcceptApplicant}
                onClick={() => handleCardClick(applicant)}
                accepted={applicant.matchStatus === 'Accepted'}
              />
            ))
          ) : (
            <div className="no-applicants">No Applicants at the moment!</div>
          )}
        </div>
        {popupVisible && (
          <div className="property-popup-background" onClick={handleClosePopup}>
            <div
              className="property-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <ExpandedApplicantCard
                applicant={selectedApplicant}
                onClose={handleClosePopup}
              />
            </div>
          </div>
        )}
      </div>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default LandlordPropertyCard
