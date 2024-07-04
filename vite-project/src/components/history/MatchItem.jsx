import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Carousel from '../carousel/Carousel'
import './MatchItem.css' // Ensure you have this file for styling
import {
  getMatchesAsync,
  updateMatchAsync,
} from '../../redux/matches/matchThunks'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux'

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
      dispatch(getMatchesAsync())
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
      dispatch(getMatchesAsync())
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
              size={{ width: 240, height: 150 }}
            />
          )}
        </div>
        {currentProperty && (
          <div className="house-details" onClick={displayPopup}>
            <h2>{currentProperty.Title}</h2>
            <p>Price: {currentProperty.ExpectedPrice}</p>
            <p>Room Type: {currentProperty.RoomType}</p>
          </div>
        )}
        <div className='right-side'>
          <div className={`match-status ${getStatusColor(match.MatchStatus)}`}>
            <p>Status: {match.MatchStatus}</p>
          </div>
          <div className="action-buttons">
            {match.MatchStatus === 'Applied' ? (
              <button
                onClick={(event) =>
                  dislikedProperty(currentProperty.HouseID, event)
                }
              >
                Withdraw Application
              </button>
            ) : match.MatchStatus === 'Disliked' ? (
              <button
                onClick={(event) =>
                  likedProperty(currentProperty.HouseID, event)
                }
              >
                Change to Applied
              </button>
            ) : null}{' '}
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
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default MatchItem
