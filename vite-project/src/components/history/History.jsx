import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MatchItem from './MatchItem'
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard'

import './History.css'
import { getPropertiesAsync } from '../../redux/properties/thunks'
import { getMatchesAsync } from '../../redux/matches/matchThunks'

function History({ tenantId }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)


  //TODO: API Improvement: need to change to getUserMatches(tenantID) and getProperty(propertyID)
  dispatch(getPropertiesAsync());
  dispatch(getMatchesAsync());
  const allProperties = useSelector((state) => state.properties.list)
  const matches = useSelector((state) => state.matches.list)
  
  // Filter matches based on tenantId
  const filteredMatches = matches.filter((match) => match.TenantID === tenantId)

  const displayPopup = (match) => {
    const currentProperty = allProperties.find(
      (property) => property.HouseID == match.HouseID
    )

    setSelectedProperty(currentProperty)
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupVisible(false)
    setSelectedProperty(null)
  }

  return (
    <div className="history-container">
      <div className="match-list">
        {filteredMatches.map((match) => (
          <MatchItem
            key={match.MatchID}
            match={match}
            displayPopup={() => displayPopup(match)}
          />
        ))}
      </div>

      {popupVisible && (
        <div className="property-popup-background" onClick={closePopup}>
          <div className="property-popup" onClick={(e) => e.stopPropagation()}>
            <ExpandedPropertyCard propertyInfo={selectedProperty} />
          </div>
        </div>
      )}
    </div>
  )
}

export default History
