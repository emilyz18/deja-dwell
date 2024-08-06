import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from '../carousel/Carousel'
import './MatchItem.css'
import {
  getTenantMatchesAsync,
  updateMatchAsync,
} from '../../redux/matches/matchThunks'
import { Alert, Snackbar } from '@mui/material'

function MatchItem({ match, displayPopup }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const allProperties = useSelector((state) => state.properties.list)
  const currentProperty = allProperties.find(
    (property) => property.HouseID == match.HouseID
  )

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'applied'
      case 'Disliked':
      case 'Rejected':
        return 'disliked'
      case 'Accepted':
        return 'accepted'
      default:
        return ''
    }
  }

  const likedProperty = (id, event) => {
    event.stopPropagation()
    const likedProperty = allProperties.find(
      (property) => property.HouseID === id
    )
    dispatch(
      updateMatchAsync({
        matchId: match.MatchID,
        matchData: {
          TenantID: user.TenantID,
          LandlordID: likedProperty.LandlordID,
          HouseID: likedProperty.HouseID,
          MatchStatus: 'Applied',
        },
      })
    ).then(() => {
      dispatch(getTenantMatchesAsync(user.TenantID))
      setNotification({
        open: true,
        message: `Liked property: ${likedProperty.Title}`,
        severity: 'success',
      })
    })
  }

  const dislikedProperty = (id, event) => {
    event.stopPropagation()
    const dislikedProperty = allProperties.find(
      (property) => property.HouseID === id
    )
    dispatch(
      updateMatchAsync({
        matchId: match.MatchID,
        matchData: {
          TenantID: user.TenantID,
          LandlordID: dislikedProperty.LandlordID,
          HouseID: dislikedProperty.HouseID,
          MatchStatus: 'Disliked',
        },
      })
    ).then(() => {
      dispatch(getTenantMatchesAsync(user.TenantID))
      setNotification({
        open: true,
        message: `Disliked property: ${dislikedProperty.Title}`,
        severity: 'error',
      })
    })
  }

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setNotification({ ...notification, open: false })
  }

  return (
    <>
      <div className="match-item">
        <div className="carousel-container-mi">
          {currentProperty && (
            <Carousel
              data={currentProperty.HouseImgs}
              size={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
        {currentProperty && (
          <div className="house-details" onClick={displayPopup}>
            <h2>{currentProperty.Title}</h2>
            <p>
              <strong>Price:</strong> {currentProperty.ExpectedPrice}
            </p>
            <p>
              <strong>Number of Bedrooms:</strong> {currentProperty.NumBedroom}
            </p>
            <p>
              <strong>Number of Bathrooms:</strong>{' '}
              {currentProperty.NumBathroom}
            </p>
          </div>
        )}
        <div className="right-side">
          <div className={`match-status ${getStatusColor(match.MatchStatus)}`}>
            <p>Status: {match.MatchStatus}</p>
          </div>
          <div className="action-buttons">
            {match.MatchStatus === 'Applied' ? (
              <button
                className="disliked"
                onClick={(event) =>
                  dislikedProperty(currentProperty.HouseID, event)
                }
              >
                Withdraw Application
              </button>
            ) : match.MatchStatus === 'Disliked' ? (
              <button
                className="accepted"
                onClick={(event) =>
                  likedProperty(currentProperty.HouseID, event)
                }
              >
                Change to Applied
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{
            position: 'fixed',
            top: '2%',
            left: '46%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            fontSize: '1.2rem' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default MatchItem
