import React, { useState, useEffect } from 'react'
import Carousel from '../carousel/Carousel'
import './LandlordPropertyCard.css' // Import the CSS file
import ApplicantCard from '../applicantCard/ApplicantCard'
import ExpandedApplicantCard from '../applicantCard/ExpandedApplicantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertiesAsync } from '../../redux/properties/thunks'
import { Snackbar, Alert } from '@mui/material'
import {
  getAllTenantProfileAsync,
  getAllTenantPrefAsync,
} from '../../redux/tenant/thunks'
import {
  getMatchesAsync,
  updateMatchAsync,
} from '../../redux/matches/matchThunks'
import { getAllUsersAsync } from '../../redux/user/thunks'

const LandlordPropertyCard = ({ landlordId }) => {
  const dispatch = useDispatch()
  const properties = useSelector((state) => state.properties.list)
  const matches = useSelector((state) => state.matches.list)
  const tenants = useSelector((state) => state.tenant.tenants)
  const tenantPrefs = useSelector((state) => state.tenant.tenantPrefs)
  const users = useSelector((state) => state.user.users)

  const [selectedProperty, setSelectedProperty] = useState(null)
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  })
  const [applicants, setApplicants] = useState([])
  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  useEffect(() => {
    dispatch(getMatchesAsync())
    dispatch(getPropertiesAsync())
    dispatch(getAllTenantProfileAsync())
    dispatch(getAllTenantPrefAsync())
    dispatch(getAllUsersAsync())
  }, [dispatch])

  useEffect(() => {
    if (properties.length > 0) {
      const property = properties.find((prop) => prop.LandlordID === landlordId)
      setSelectedProperty(property)
    }
  }, [properties, landlordId])

  useEffect(() => {
    if (
      matches.length > 0 &&
      tenants.length > 0 &&
      tenantPrefs.length > 0 &&
      users.length > 0
    ) {
      const newApplicants = matches
        .filter(
          (match) =>
            match.LandlordID === landlordId && match.MatchStatus !== 'Rejected'
        )
        .map((match) => {
          const tenantProfile = tenants.find(
            (t) => t.TenantID === match.TenantID
          )
          const tenantPreference = tenantPrefs.find(
            (p) => p.TenantPreferenceID === tenantProfile.TenantPreferenceID
          )
          const userProfile = users.find((u) => u.TenantID === match.TenantID)
          if (tenantProfile && tenantPreference && userProfile) {
            return {
              name: userProfile.UserName,
              image: userProfile.ProfileImg,
              phoneNumber: userProfile.PhoneNumber,
              email: userProfile.UserEmail,
              gender: userProfile.Gender,
              age: tenantProfile.Age,
              familySize: tenantPreference.NumOfResident,
              occupation: tenantProfile.Occupation,
              lengthOfLease: tenantPreference.Duration,
              earlyBirdNightOut: tenantPreference.Habit,
              financialSituation: `Income: ${tenantProfile.Income}, Company: ${tenantProfile.Company}`,
              matchID: match.MatchID,
              landlordID: match.LandlordID,
              houseID: match.HouseID,
              tenantID: match.TenantID,
              matchStatus: match.MatchStatus,
            }
          }
          return null
        })
        .filter((applicant) => applicant !== null)
      setApplicants(newApplicants)
    }
  }, [matches, tenants, tenantPrefs, users, landlordId])

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
    setApplicants(applicants.filter((applicant) => applicant.name !== name))
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

    // Reject other applicants
    applicants.forEach((applicant) => {
      if (applicant.name !== name) {
        dispatch(
          updateMatchAsync({
            matchId: applicant.matchID,
            matchData: {
              TenantID: applicant.tenantID,
              LandlordID: applicant.landlordID,
              HouseID: applicant.houseID,
              MatchStatus: 'Rejected',
            },
          })
        )
      }
    })

    setNotification({
      open: true,
      message: `Accepted applicant: ${name}`,
      severity: 'success',
    })
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
