import React, { useState, useEffect } from 'react'
import Carousel from '../carousel/Carousel'
import './LandlordPropertyCard.css'
import ApplicantCard from '../applicantCard/ApplicantCard'
import ExpandedApplicantCard from '../applicantCard/ExpandedApplicantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertiesAsync } from '../../redux/properties/thunks'
import { Snackbar, Alert, Box } from '@mui/material'
import Fab from '@mui/material/Fab';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import {
  getLandlordMatchesAsync,
  reopenMatchesAsync,
  updateMatchAsync,
} from '../../redux/matches/matchThunks'

const LandlordPropertyCard = ({ landlordId }) => {
  const dispatch = useDispatch()
  const properties = useSelector((state) => state.properties.list)
  const getLandlordMatchesStatus = useSelector(
    (state) => state.matches.getLandlordMatches
  )
  const landlordMatchesApplicants = useSelector(
    (state) => state.matches.landlordMatches
  )
  const landlordID = useSelector((state) => state.user.user.LandlordID)

  const [selectedProperty, setSelectedProperty] = useState(null)
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
    if (getLandlordMatchesStatus === 'IDLE') {
      dispatch(getPropertiesAsync())
      dispatch(getLandlordMatchesAsync(landlordID))
    } else if (getLandlordMatchesStatus === 'FULFILLED') {
      setApplicants(landlordMatchesApplicants);
      if (landlordMatchesApplicants.some(applicant => applicant.matchStatus === 'Accepted')) {
        setHasAccept(true);
      } else {
        setHasAccept(false);
      }
    }
  }, [getLandlordMatchesStatus, hasAccepted, landlordID, landlordMatchesApplicants, dispatch])

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
    if (selectedProperty) {
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

  const reloadApplicants = () => {
    dispatch(getPropertiesAsync())
    dispatch(getLandlordMatchesAsync(landlordID))

  }

  if (!selectedProperty) {
    return <div>Your have not publish a property yet...</div>
  }

  const {
    HouseImgs: images,
    Title: title,
    Description: description,
    Street: address,
    ExpectedPrice: price,
    NumBedroom: bedroom,
    NumBathroom: bathroom,
  } = selectedProperty

  return (
    <>
      <div className="landlord-dashboard-display">
        <div className="landlord-property-card">
          <div className="landlord-carousel-container">
            <Carousel data={images} size={{ width: '100%', height: '100%' }} />
          </div>
          <div className="property-information">
            <h3>{title}</h3>
            <div className="property-description">
              <strong>Description:</strong>
              <span>{description}</span>
            </div>
            <div className="property-details">
              <div className="property-detail">
                <strong>Address:</strong>
                <span>{address}</span>
              </div>
              <div className="property-detail">
                <strong>Price:</strong>
                <span>${price} per month</span>
              </div>
              <div className="property-detail">
                <strong>Bedroom(s):</strong>
                <span>{bedroom}</span>
              </div>
              <div className="property-detail">
                <strong>Bathroom(s):</strong>
                <span>{bathroom}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="landlord-applicant-card">
          <div>
            <h1 className="applicant-title">Applicants</h1>
          </div>
          <div className="reopen-button-container">
            {hasAccepted ? (
              <div>
                <button className="reopen-button" onClick={handleReopenMatch}>
                  Reopen Match
                </button>
              </div>
            ) : null}
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
        </div>
        {popupVisible && (
          <div className="property-popup-background" onClick={handleClosePopup}>
            <div
              className="applicant-popup"
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
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Fab
          variant="extended"
          size="medium"
          onClick={reloadApplicants}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          <ReplayRoundedIcon sx={{ mr: 1 }} />
          Reload Applicants
        </Fab>
      </Box>
    </>

  )
}

export default LandlordPropertyCard
