import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertiesAsync } from '../../redux/properties/thunks'
import Carousel from '../carousel/Carousel'
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard'
import './MatchItem.css' // Ensure you have this file for styling

function MatchItem({ match }) {
  const [popupVisible, setPopupVisible] = useState(false)
  const dispatch = useDispatch()
  const getPropertiesStatus = useSelector(
    (state) => state.properties.getProperties
  )

  const allProperties = useSelector((state) => state.properties.list)

  const currentProperty = allProperties.find(
    (property) => property.HouseID == match.HouseID
  )

  useEffect(() => {
    if (getPropertiesStatus === 'IDLE') {
      dispatch(getPropertiesAsync())
    }
  }, [getPropertiesStatus, dispatch])

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

  const displayPopup = (property) => {
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupVisible(false)
  }

  return (
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
        <div className="house-details">
          <h2>{currentProperty.Title}</h2>
          <p>Price: {currentProperty.ExpectedPrice}</p>
          <p>Room Type: {currentProperty.RoomType}</p>
        </div>
      )}
      <div className={`match-status ${getStatusColor(match.MatchStatus)}`}>
        <p>Status: {match.MatchStatus}</p>
      </div>
      {popupVisible && (
        <div className="property-popup-background" onClick={closePopup}>
          <div className="property-popup" onClick={(e) => e.stopPropagation()}>
            <ExpandedPropertyCard propertyInfo={currentProperty} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchItem
